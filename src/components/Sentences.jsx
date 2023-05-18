import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  }),
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
};

export const Sentences = () => {
  const [phrase, setPhrase] = useState(["how", "are", "you", "hola", "hola"]);
  const [phrasePick, setPhrasePick] = useState([
    "how",
    "are",
    "you",
    "hola",
    "hola",
  ]);
  const delWord = (indexWord, changeState) => {
    const newArr = [...phrase];
    newArr.splice(indexWord, 1);
    changeState(newArr);
  };
  const addWord = (word, state, changeState) => {
    changeState([...state, word]);
  };
  return (
    <>
      <div className="flex gap-2">
        <button
          className="btn"
          onClick={() => setPhrase([...phrase, `${phrase.length}`])}
        >
          click
        </button>
        <button className="btn" onClick={() => delWord()}>
          del
        </button>
        <AnimatePresence>
          {phrase.map((word, i) => {
            const key = uuidv4();
            return (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                custom={i}
                key={i}
              >
                <div
                  className="bg-white p-2 rounded-lg text-black"
                  onClick={() => {
                    delWord(i, setPhrase);
                    addWord(word, phrasePick, setPhrasePick);
                  }}
                >
                  {word}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="flex gap-3">
        {phrasePick.map((word, i) => (
          <div
            key={i}
            className="bg-black p-3 rounded-lg"
            onClick={() => {
              addWord(word, phrase, setPhrase);
              delWord(i, setPhrasePick);
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </>
  );
};
