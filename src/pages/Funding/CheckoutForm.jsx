import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth/useAuth";
// import {format} from "date-fns";

const CheckoutForm = () => {
  const {user} = useAuth();
  const {price} = useParams();
  const priceNumber = parseFloat(price);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (priceNumber > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: priceNumber,
        })
        .then((res) => {
          console.log(res);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, priceNumber, user.displayName]);

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
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        /* save payment info */
        const payment = {
          name: user?.displayName,
          price: price,
          date: new Date().toLocaleDateString(),
          transactionId: paymentIntent.id,
        };
        const {data} = await axiosSecure.post("/payments", payment);
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
