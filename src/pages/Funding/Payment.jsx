import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHER_KEY);

const Payment = () => {
  return (
    <div className="md:mx-20 md:mt-20 min-h-[calc(100vh-252px)]">
      <div>
        <h1 className="text-4xl text-center font-bold my-10">Payment Now:</h1>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
