import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import mySite from "./Domain";
import { useNavigate } from "react-router-dom";

const FormVerb = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [verb, setVerb] = useState({
    infinitive: "",
    past: "",
    participle: "",
    spanish: "",
    owner: user.user_id,
  });

  const sendVerb = () => {
    console.log(verb);
    const allPropsNotEmpty = Object.values(verb).every((prop) => prop !== "");
    if (allPropsNotEmpty) {
      axios
        .post(`${mySite}verbs`, verb)
        .then((res) => {
          if (res.status === 200) {
            toast.success("nice", { duration: 1000 });
            setTimeout(() => {
              navigate("/my-verbs");
            }, 1000);
          }
        })
        .catch((err) => toast.error("algo salio mal"));
    }

    // axios.
  };

  return (
    <div>
      <Toaster />
      <section className="grid h-screen place-content-center bg-slate-900 text-slate-300">
        <div className="mb-4 text-center text-indigo-400">
          <h1 className="text-3xl font-bold tracking-widest">Nuevo verbo</h1>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <input
            type="text"
            name="password"
            placeholder="Infinitivo"
            onChange={(e) => setVerb({ ...verb, infinitive: e.target.value })}
            className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
          />
          <div>
            <input
              type="text"
              name="confirm_password"
              placeholder="Pasado"
              onChange={(e) => setVerb({ ...verb, past: e.target.value })}
              className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="confirm_password"
              placeholder="Participio"
              onChange={(e) => setVerb({ ...verb, participle: e.target.value })}
              className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="confirm_password"
              placeholder="Español"
              onChange={(e) => setVerb({ ...verb, spanish: e.target.value })}
              className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={sendVerb}
            className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
          >
            <span id="showHide">Enviar</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default FormVerb;
