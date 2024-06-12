import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth/useAuth";

const CheckoutForm = () => {
  const {user} = useAuth();
  const {price} = useParams();
  const priceNumber = parseFloat(price);
  console.log(typeof priceNumber);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (priceNumber > 0) {
      axiosSecure
        .post("/create-payment-intent", {price: priceNumber})
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, priceNumber]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment-error", error);
      setError(error.message);
    } else {
      console.log("payment-method", paymentMethod);
      setError("");
    }
    /* confirm payment */
    const {paymentIntent, error: confirmError} =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm-error");
    } else {
      console.log("payment-intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        /* save payment info */
        const payment = {
          price: price,
          transactionId: paymentIntent.id,
        };
        const {data} = await axiosSecure.post("/payments", payment);
        console.log("payment-save", data);
        if (data?.paymentResult?.insertedId) {
          toast.success("Payment Successful");
        }
      }
    }
  };

  return (
    <div>
      <div className="md:mx-20 md:mt-20">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="bg-[#D1A054] px-4 py-1 mt-2 ml-2 rounded font-semibold"
            type="submit"
            // disabled={!stripe || clientSecret}
          >
            Pay
          </button>
          <p className="text-red-500">{error}</p>
          {transactionId && (
            <p className="text-green-500">
              Your Transaction Id: {transactionId}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
