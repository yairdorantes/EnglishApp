import { useContext, useEffect, useRef, useState } from "react";
import "./styles/verbs.css";
import axios from "axios";
import mySite from "./Domain";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { useToggleValue } from "../myHooks/toggleValue";
const MyVerbs = () => {
  const { user } = useContext(AuthContext);
  const { active, setTrue, setFalse } = useToggleValue(false);
  const [toDelete, setToDelete] = useState(false);
  const [delItems, setDelItems] = useState([]);

  const audioRef = useRef();
  const [audio, setAudio] = useState();
  const [verbs, setVerbs] = useState([]);
  const playSound = (base64) => {
    setAudio(`data:audio/mpeg;base64,${base64}`);

    audioRef.current.play();
  };
  const itemToDelete = (item) => {
    console.log(item);
    const index = delItems.indexOf(item),
      newArray = [...delItems];
    if (index !== -1) newArray.splice(index, 1);
    else newArray.push(item);
    setDelItems(newArray);
  };
  const sendDelInfo = () => {
    axios
      .delete(`${mySite}verbs`, { data: delItems })
      .then((res) => {
        console.log(res);
        if (res.status === 200) toast.success("Elementos borrados");
      })
      .catch((err) => {
        toast.error("algo salio mal");
        console.log(err);
      });
    setToDelete(false);
  };

  useEffect(() => {
    console.log(user.user_id);
    setTrue();
    axios
      .get(`${mySite}verbs/${user.user_id}`)
      .then((res) => {
        setVerbs(res.data.verbs);
        console.log(res.data.verbs);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setFalse());
  }, []);

  return (
    <div className="p-2">
      {active && <Loader />}

      <div className="flex w-full  mx-auto text-center">
        <div className="w-1/4 font-bold text-success ">Infinitivo</div>
        <div className="w-1/4 font-bold text-success ">Pasado</div>
        <div className="w-1/4 font-bold text-success ">Participio</div>
        <div className="w-1/4 font-bold text-success ">español</div>
      </div>

      {verbs &&
        verbs.map((verb, key) => (
          <div
            key={key}
            onClick={() => toDelete && itemToDelete(verb.id)}
            className={`flex  mt-5 mx-auto text-center bg-gray-800  rounded-lg ${
              toDelete && delItems.includes(verb.id)
                ? "bg-red-800"
                : "bg-gray-800"
            } `}
          >
            <div
              className="verb-row"
              onClick={() => !toDelete && playSound(verb.inf_sound)}
            >
              {verb.infinitive}
            </div>
            <div
              className="verb-row"
              onClick={() => !toDelete && playSound(verb.past_sound)}
            >
              {verb.past}
            </div>
            <div
              className="verb-row"
              onClick={() => !toDelete && playSound(verb.participle_sound)}
            >
              {verb.participle}
            </div>
            <div className="verb-row">{verb.spanish}</div>
          </div>
        ))}
      <audio autoPlay src={audio} ref={audioRef} />
      <div className="mt-10">
        <button className="">
          <Link to={"/my-verbs/add"}>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-10 h-10"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M2 18h10v2H2v-2zm0-7h20v2H2v-2zm0-7h20v2H2V4zm16 14v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
            </svg>
          </Link>
        </button>
        <button className="" onClick={() => setToDelete(!toDelete)}>
          <svg
            className={`w-9 h-9 ml-5 active:w-6 active:h-6 transition-all ${
              toDelete ? "text-red-600" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
          >
            <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0z" />
          </svg>
        </button>
        {toDelete && (
          <button className="ml-5" onClick={sendDelInfo}>
            <div className="badge badge-error gap-2 p-4 active:p-0 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              borrar seleccionados
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MyVerbs;
