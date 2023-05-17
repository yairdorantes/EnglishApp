import axios from "axios";
import { useToggleList } from "../myHooks/Lists";
import mySite from "./Domain";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-hot-toast";

const LearnedWords = () => {
  const { user } = useContext(AuthContext);
  const { list, toggleList, setList } = useToggleList();
  const [words, setWords] = useState([]);
  const [initialWords, setInitialWords] = useState([]);
  const getWords = () => {
    axios
      .get(`${mySite}learn/${user.user_id}`)
      .then((res) => {
        setWords(res.data.cards);
        setList(res.data.list);
        setInitialWords(res.data.list);
        // console.log(res.data.cards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendData = () => {
    const unlearn = initialWords.filter((word) => !list.includes(word));
    axios
      .post(`${mySite}learn/${user.user_id}`, { unlearn })
      .then((res) => toast.success("Cambios relizados con éxito!"))
      .catch((err) => {
        console.log(err);
        toast.error("Ups algo salió mal");
      });
  };
  useEffect(() => {
    getWords();
  }, []);

  return (
    <div>
      <div className="alert shadow-lg w-1/2 mx-auto mb-10">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            {" "}
            Aqui se muestran las palabras aprendidas, si quieres repazar de
            nuevo desmarca la casilla
          </span>
        </div>
      </div>
      <div className="">
        {words.map((word, key) => (
          <div
            key={key}
            onClick={() => toggleList(word.id)}
            className="flex justify-between mx-auto bg-blue-900 text-white rounded-lg w-[300px] p-2 mb-2 "
          >
            <div>
              <span className="font-bold">{key + 1}.</span> {word.cardTitle} /{" "}
              {word.cardMeaning}{" "}
            </div>
            <div>
              <input
                readOnly
                type="checkbox"
                checked={list.includes(word.id)}
                className="checkbox rounded-full checkbox-success"
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`fixed  w-1/2 left-1/2 text-center  -translate-x-1/2 ${
          list.length < initialWords.length ? "bottom-0" : "-bottom-16"
        }   transition-all duration-200`}
      >
        <button onClick={sendData} className=" btn btn-success w-3/4 mx-auto  ">
          <div>Guardar cambios</div>
        </button>
      </div>
    </div>
  );
};

export default LearnedWords;
