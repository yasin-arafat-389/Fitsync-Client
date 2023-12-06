/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { ImSpinner9 } from "react-icons/im";
import { FaInfoCircle } from "react-icons/fa";

const StripeForm = ({ func, ho }) => {
  let stripe = useStripe();
  let elements = useElements();
  let axios = useAxios();
  const [clientSecret, setClientSecret] = useState("");

  let [wait1, setWait1] = useState(false);

  let totalPrice = 120;

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axios, totalPrice]);

  const handleSubmit = async (event) => {
    setWait1(true);
    event.preventDefault();

    if (!stripe || !elements) {
      setWait1(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setWait1(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setWait1(false);
      toast.error(error.message);
    } else {
      toast.success("Payment successfull");
      func();
    }
  };

  return (
    <div className="w-[100%]">
      <form onSubmit={handleSubmit}>
        <CardElement
          className="stripe-input-fields"
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
        <div className="flex gap-5">
          <Button
            className="mt-5 bg-green-400"
            type="submit"
            disabled={!clientSecret || wait1 ? true : false}
          >
            {wait1 ? (
              <div className="flex items-center justify-center gap-4">
                <ImSpinner9 className="animate-spin text-[20px]" />
                Payment Processing
              </div>
            ) : (
              "Pay Now"
            )}
          </Button>
          <Button
            className="mt-5 bg-red-400"
            onClick={ho}
            disabled={wait1 ? true : false}
          >
            Cancel
          </Button>
        </div>

        <div className="mt-7">
          <div className="info-card-number flex gap-3 items-center">
            <FaInfoCircle className="text-blue-600" />
            <span className="font-bold">
              Card number:{" "}
              <span className="text-blue-400">4242 4242 4242 4242</span>
            </span>
          </div>

          <div className="info-mm-yy flex gap-3 items-center">
            <FaInfoCircle className="text-blue-600" />
            <span className="font-bold">
              MM / YY: <span className="text-blue-400">04 / 35</span>
            </span>
          </div>

          <div className="info-mm-yy flex gap-3 items-center">
            <FaInfoCircle className="text-blue-600" />
            <span className="font-bold">
              CVC: <span className="text-blue-400">424</span>
            </span>
          </div>

          <div className="info-mm-yy flex gap-3 items-center">
            <FaInfoCircle className="text-blue-600" />
            <span className="font-bold">
              ZIP: <span className="text-blue-400">24242</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StripeForm;
