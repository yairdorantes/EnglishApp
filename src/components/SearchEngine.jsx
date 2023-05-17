import { motion } from "framer-motion";
import { useState } from "react";
const variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
    },
  }),
};
const SearchEngine = ({ changeState, originalState }) => {
  const [result, setResult] = useState(-1);
  const handleQuery = (query) => {
    if (query.length > 0) {
      const filteredItems = originalState.filter((item) => {
        return (
          item.cardTitle.toLowerCase().includes(query.toLowerCase()) ||
          item.cardMeaning.toLowerCase().includes(query.toLowerCase())
        );
      });
      setResult(filteredItems.length);
      console.log(filteredItems.length);
      changeState(filteredItems);
    } else {
      console.log(originalState);
      changeState(originalState);
      //   changeState(initialState);
    }
  };

  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Busca tus palabras..."
          required
          onChange={(e) => handleQuery(e.target.value)}
        />
      </div>
      {result === 0 && (
        <motion.div variants={variants} initial="hidden" animate="visible">
          <div className="text-center font-sans alert-error w-1/2 mx-auto rounded-lg mt-2 transition-all">
            Sin cohincidencias
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default SearchEngine;