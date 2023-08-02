import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import mySite from "./Domain";
import Loader3 from "./Loader3";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const stripePromise = loadStripe(
  "pk_test_51KjBqNA9KCn8yVMOEG2TF4LAS9CZwMVfMuAIHu1opMaabVxmgUri9qkETyQ9Q7DGyB6g9bNxEg62zf6dsqQZGdij00t1hmBwwH"
);

const CheckOut = () => {
  const [loader, setLoader] = useState(false);
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const redirect = useNavigate();

  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      setLoader(true);
      console.log(paymentMethod);
      const { id } = paymentMethod;
      axios
        .post(`${mySite}checkout`, { id, amount: 15000, user_id: user.user_id })
        .then((res) => {
          console.log(res.data);
          toast.success("Pago realizado con éxito");
          setTimeout(() => {
            redirect("/cards/mis-cartas");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Pago rechazado, intenta de nuevo");
        })
        .finally(() => setLoader(false));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="text-white text-center text-lg mb-2">
        Ingresa los datos de tu Targeta
      </div>
      <div className="">
        <CardElement className="bg-gray-100  border-2 border-gray-700 rounded-md p-4" />
      </div>
      <button disabled={loader} className="btn   btn-success w-full mt-2 ">
        {loader ? <Loader3 /> : "comprar"}
      </button>
    </form>
  );
};
const ModalCheckout = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOut />
      </Elements>
    </div>
  );
};

export default ModalCheckout;
