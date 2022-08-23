import React, { useEffect, useState } from "react";

const Exercises = () => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const allAnswers = document.querySelectorAll(".answer");
    setAnswers(allAnswers);
  }, []);

  const checkStyleAnswer = (e) => {
    answers.forEach((answer) =>
      answer === e.target
        ? (e.target.className = "answer-selected")
        : (answer.className = "answer")
    );
  };
  return (
    <>
      <div className="exercises-container">
        <h1>complete the text</h1>
        <span>some animals like bolo and beji</span>
        <div className="container-answers">
          <button onClick={checkStyleAnswer} className="answer">
            nice
          </button>
          <button onClick={checkStyleAnswer} className="answer">
            hash
          </button>
          <button onClick={checkStyleAnswer} className="answer">
            you
          </button>
        </div>
      </div>
      <footer className="btn-check">
        <button className="btn-check2">send</button>
      </footer>
    </>
  );
};

export default Exercises;
