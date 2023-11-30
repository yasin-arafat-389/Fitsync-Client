import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const Newsletter = () => {
  let [loading, setLoading] = useState(false);
  let axios = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    axios.post("/newsletter", formData).then((res) => {
      if (res.data === "Successfully Subscribed") {
        resetForm();
        toast.success("Subscription Successfull 👍");
      } else {
        toast.error("You have already subscribed ⚠️");
      }

      setLoading(false);
    });
  };

  return (
    <div className="w-[70%] mx-auto">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-24">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Keep Me Updated
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-gray-300">
          Dive into Exclusive Updates, Expert Tips, and Inspiring Success
          Stories in Our Monthly Fitness Newsletter.
        </p>

        <form
          className="mx-auto mt-10 flex max-w-md gap-x-4"
          onSubmit={handleSubmit}
        >
          <input
            id="name"
            name="name"
            type="text"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Enter your name"
            onChange={handleInputChange}
            value={formData.name}
          />

          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={formData.email}
          />

          <button
            type="submit"
            disabled={loading && true}
            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {loading ? (
              <div className="flex gap-4">
                <ImSpinner9 className="animate-spin text-[20px]" />
                Subscribing
              </div>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6"></stop>
              <stop offset="1" stopColor="#7ED321" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Newsletter;
