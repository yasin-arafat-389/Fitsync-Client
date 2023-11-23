import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <StripeForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
