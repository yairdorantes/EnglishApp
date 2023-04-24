import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import mySite from "./Domain";
import wordSound from "../media/cards/audio.png";
import { useLocation } from "react-router-dom";
import NewMenu from "./NewMenu";

const Quiz = () => {
  const location = useLocation();
  const { cards, section } = location.state;
  // console.log(cards);
  let { user } = useContext(AuthContext);

  const audioRef = useRef();

  let urlIncreaseScore = `${mySite}increase/${user.user_id}`;
  const [radioActive, setRadioActive] = useState();
  const [cardPicked, setCardPicked] = useState();
  const [answers, setAnswers] = useState();
  const [correct, setCorrect] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cont, setCont] = useState(1);
  const [audio, setAudio] = useState();
  const [cardsShuffled, setCardsShuffled] = useState(cards);
  const [contCorrects, setContCorrects] = useState(0);
  // const cardsShuffled = ;
  const handleRadio = (number) => {
    if (!isSent) {
      setRadioActive(number);
      if (number === cardPicked.id) {
        setCorrect(true);
        setContCorrects(contCorrects + 1);
        setIsSent(true);
        axios.post(urlIncreaseScore);
      } else {
        setCorrect(false);
        setIsSent(true);
      }
    }
  };

  // const generateQuestion = () => {
  //   isSent && setCont(cont + 1);
  //   setIsSent(false);
  //   setRadioActive(-1);
  //   const arr = cards,
  //     shuffled = arr.sort(() => 0.5 - Math.random()),
  //     randomValues = shuffled.slice(0, 3);
  //   setAnswers(randomValues);
  //   // console.log(randomValues);
  //   const randomIndex = Math.floor(Math.random() * randomValues.length);
  //   setCardPicked(randomValues[randomIndex]);
  // };

  const getNextQuestion = () => {
    console.log(cardsShuffled);
    if (cont < cards.length) {
      const cardSelected = cardsShuffled[0];
      setCardPicked(cardSelected);
      console.log(cardSelected.cardTitle);
      isSent && setCont(cont + 1);
      setIsSent(false);
      setRadioActive(-1);
      const delFisrtCard = cardsShuffled.filter(
        (obj) => obj.id !== cardSelected.id
      );
      setCardsShuffled(delFisrtCard);
      const filteredObjects = cards.filter((obj) => obj.id !== cardSelected.id);
      const randomAnswers = filteredObjects
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      randomAnswers.push(cardSelected);
      setAnswers(randomAnswers.sort(() => 0.5 - Math.random()));
    }
  };

  const repeatQuiz = () => {
    setCardsShuffled(cards.sort(() => 0.5 - Math.random()));
    setContCorrects(0);
    setIsSent(false);
    setCont(1);
    setRadioActive(-1);
    getNextQuestion();
  };

  const handleAudio = (sound) => {
    const audio = `data:audio/mpeg;base64,${sound}`;
    setAudio(audio);
    audioRef.current.play();
  };

  useEffect(() => {
    getNextQuestion();
  }, []);

  // console.log(cards.sort((a, b) => 0.5 - Math.random()));
  return (
    <>
      <div className="h-screen bg-gray-900">
        <NewMenu />
        <div className="w-full max-w-md mx-auto  mt-20">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Quiz sección <span className="text-teal-500">{section}</span>
          </h1>
          <form>
            <div className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    className={`btn btn-success ${!isSent && "btn-disabled"}`}
                    onClick={getNextQuestion}
                  >
                    Siguiente
                  </div>
                ) : (
                  isSent &&
                  cont === cards.length && (
                    <div className="btn btn-info" onClick={repeatQuiz}>
                      Repasar de nuevo
                    </div>
                  )
                )}

                {isSent ? (
                  correct ? (
                    <div className="alert alert-success shadow-lg w-1/2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Correcto! +1</span>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-error shadow-lg w-1/2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current flex-shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Incorrecto</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-1/2"></div>
                )}
              </div>
            </div>
          </form>
          {isSent && cont === cards.length && (
            <div className="text-2xl mx-auto mt-5 font-bold bg-accent-content rounded-md p-5 w-3/4">
              Tu puntaje fue:
              <span className="text-success"> {contCorrects}</span> de{" "}
              <span className="text-info">{cards.length}</span>!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
