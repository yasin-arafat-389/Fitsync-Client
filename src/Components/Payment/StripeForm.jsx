import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const StripeForm = () => {
  let stripe = useStripe();
  let elements = useElements();
  let axios = useAxios();
  const [clientSecret, setClientSecret] = useState("");

  let totalPrice = 120;

  useEffect(() => {
    if (totalPrice > 0) {
      console.log(totalPrice);
      axios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axios, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Payment successfull");
      console.log(paymentMethod);
    }
  };

  return (
    <div className="w-[40%]">
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
        <Button
          className="mt-5 bg-green-400"
          type="submit"
          disabled={!clientSecret ? true : false}
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default StripeForm;
