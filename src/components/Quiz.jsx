import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import mySite from "./Domain";
import wordSound from "../media/cards/audio.png";
import { useLocation } from "react-router-dom";
import NewMenu from "./NewMenu";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import arrayShuffle from "array-shuffle";

const Quiz = () => {
  const location = useLocation();
  const { cards, section } = location.state;
  let { user } = useContext(AuthContext);
  const audioRef = useRef();

  let urlIncreaseScore = `${mySite}increase/${user.user_id}`;
  const [radioActive, setRadioActive] = useState();
  const [cardPicked, setCardPicked] = useState();
  const [Cards, setCards] = useState(arrayShuffle(cards));
  const [answers, setAnswers] = useState();
  const [correct, setCorrect] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cont, setCont] = useState(0);
  const [audio, setAudio] = useState();
  const [contCorrects, setContCorrects] = useState(0);

  const handleRadio = (number) => {
    if (!isSent) {
      setRadioActive(number);
      if (number === cardPicked.id) {
        showResultToast(true);
        setCorrect(true);
        setContCorrects(contCorrects + 1);
        setIsSent(true);
        axios.post(urlIncreaseScore);
      } else {
        showResultToast(false);
        setCorrect(false);
        setIsSent(true);
      }
    }
  };

  const showResultToast = (isCorrect) => {
    isCorrect
      ? toast.success("Correcto! 😃", { duration: Infinity })
      : toast.error("Incorrecto! 😓", { duration: Infinity });
  };

  const getNextQuestion = () => {
    toast.dismiss();
    const cardSelected = Cards[cont];
    setCardPicked(Cards[cont]);
    handleAudio(cardSelected.cardSound);
    setIsSent(false);
    setRadioActive(-1);
    //*  Get list without card selected to get 2 random answers after...
    const filteredObjects = Cards.filter((obj) => obj.id !== cardSelected.id);
    const randomAnswers = arrayShuffle(filteredObjects).slice(0, 2);
    //* add all card data to random answers list to get more info abour every answer
    randomAnswers.push(cardSelected);
    setAnswers(arrayShuffle(randomAnswers));
    setCont(cont + 1);
  };

  const repeatQuiz = () => {
    setCont(0);
    setCards(arrayShuffle(Cards));
    setContCorrects(0);
    setIsSent(false);
    setRadioActive(-1);
  };

  const handleAudio = (sound) => {
    const audio = `data:audio/mpeg;base64,${sound}`;
    setAudio(audio);
    audioRef.current.play();
  };

  useEffect(() => {
    getNextQuestion();
  }, []);
  useEffect(() => {
    if (cont === 0) getNextQuestion();
  }, [cont]);

  return (
    <>
      <NewMenu />
      <OutsideClickHandler onOutsideClick={() => toast.dismiss()}>
        <div className="">
          <div className="w-full max-w-md mx-auto  mt-10">
            <h1 className="text-4xl font-bold mb-4 text-white text-center">
              Quiz <span className="text-teal-300">{section}</span>
            </h1>
            <form>
              <div className="bg-slate-800 text-white shadow-md rounded w-[95%] mx-auto   px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">
                  Pregunta {cont}/{cards.length}{" "}
                </h2>
                <p className="mb-4 text-xl">
                  ¿Cuál es el significado de{" "}
                  <span className="font-bold">
                    {cardPicked && cardPicked.cardTitle}
                  </span>
                  ?
                  <img
                    onClick={() => handleAudio(cardPicked.cardSound)}
                    className="w-6 mt-2 ml-2"
                    src={wordSound}
                    alt=""
                  />
                </p>

                <audio autoPlay src={audio} ref={audioRef} />

                {answers &&
                  answers.map((answer, key) => {
                    return (
                      <div
                        key={key}
                        onClick={() => handleRadio(answer.id)}
                        className={`mb-4 font-bold ${
                          isSent
                            ? correct
                              ? answer.id === cardPicked.id
                                ? "bg-emerald-800"
                                : "bg-gray-900"
                              : answer.id === cardPicked.id
                              ? "bg-emerald-800"
                              : radioActive === answer.id
                              ? "bg-red-800"
                              : "bg-gray-900"
                            : "bg-gray-900"
                        }  h-12 flex  rounded-md`}
                      >
                        <label className="inline-flex items-center">
                          <input
                            readOnly
                            type="radio"
                            name="q1"
                            value="b"
                            disabled={radioActive > 1 && true}
                            checked={radioActive === answer.id ? true : false}
                            className="radio radio-success h-5 w-5 ml-2 text-blue-600"
                          />
                          <span className="ml-4 text-gray-200">
                            {answer.cardMeaning}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                <div className="flex items-center justify-evenly">
                  {cont < cards.length ? (
                    <div
                      className={`btn btn-success w-full ${
                        !isSent && "btn-disabled"
                      }`}
                      onClick={getNextQuestion}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-12 h-12 "
                        fill="currentColor"
                        height="1em"
                        width="1em"
                      >
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                        <path d="M8 16l5-4-5-4zm5-4v4h2V8h-2z" />
                      </svg>
                    </div>
                  ) : (
                    isSent &&
                    cont === cards.length && (
                      <div
                        className="btn btn-secondary w-full w-1/2  btn-lg"
                        onClick={repeatQuiz}
                      >
                        <svg
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          className="w-12 h-12  "
                          height="1em"
                          width="1em"
                        >
                          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm120 182.15a8.62 8.62 0 01-8.62 8.62h-59.54a8.61 8.61 0 01-6.09-14.71l22.17-22.17-5.6-6.51a87.38 87.38 0 10-62.94 148 87.55 87.55 0 0082.42-58.25A16 16 0 11368 295.8a119.4 119.4 0 11-112.62-159.18 118.34 118.34 0 0186.36 36.95l.56.62 4.31 5 14.68-14.68a8.44 8.44 0 016-2.54 8.61 8.61 0 018.68 8.63z" />
                        </svg>
                      </div>
                    )
                  )}
                </div>
              </div>
            </form>
            {isSent && cont === cards.length && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <div className="bg-blue-500 text-white p-4 w-[95%] mx-auto rounded-lg">
                  <p className="text-2xl font-bold">Felicidades! 🎉</p>
                  <p className="text-xl">
                    Obtuviste una calificacion de{" "}
                    <span className="badge text-lg p-3 badge-success font-medium">
                      {((contCorrects / cards.length) * 100).toFixed(1)}%
                    </span>{" "}
                    .
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default Quiz;
