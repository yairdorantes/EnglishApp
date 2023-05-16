import { useToggleList } from "../myHooks/Lists";

const LearnedWords = () => {
  const { list, toggleList } = useToggleList();
  const words = [
    { id: 1, cardTitle: "word", cardMeaning: "Palabra" },
    { id: 2, cardTitle: "fast", cardMeaning: "Rapido" },
  ];
  return (
    <div>
      {words.map((word, key) => (
        <ul
          key={key}
          onClick={() => toggleList(word.id)}
          className="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400"
        >
          <li className="flex items-center space-x-3">
            {!list.includes(word.id) ? (
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                viewBox="0 0 15 15"
                height="1em"
                width="1em"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>
              {word.cardTitle} {"->"} {word.cardMeaning}
            </span>
          </li>
        </ul>
      ))}
      <div
        className={`fixed  w-1/2 left-1/2 text-center  -translate-x-1/2 ${
          list.length > 0 ? "bottom-0" : "-bottom-16"
        }   transition-all duration-200`}
      >
        <button className=" btn btn-success w-3/4 mx-auto ">
          <div>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-9 h-9"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LearnedWords;
