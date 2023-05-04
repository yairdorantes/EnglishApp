import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import mySite from "./Domain";
import FormCard2 from "./FormCard2";
import { Toaster, toast } from "react-hot-toast";
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";

const ModifyCards = () => {
  const [cards, setCards] = useState();
  const { user } = useContext(AuthContext);
  const [toDelete, setToDelete] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState({
    cardTitle: "",
    cardMeaning: "",
    imageURL: "",
    cardImage: "",
  });
  const toggleToDelete = (card_id) => {
    console.log(toDelete.includes(card_id));
    if (toDelete.includes(card_id)) {
      const updateToDelete = toDelete.filter((id) => id !== card_id);
      setToDelete(updateToDelete);
    } else {
      setToDelete([...toDelete, card_id]);
    }
    // console.log(toDelete);
  };

  const delCards = () => {
    axios
      .post(`${mySite}cards/delete/`, { del_these: toDelete })
      .then((res) => {
        console.log(res);
        res.status === 200 && toast.success("Eliminacion exitosa!");
        getCards();
      })
      .catch((err) => {
        toast.error("Ups algo salió mal");
        console.log(err);
      });
  };
  const getCards = () => {
    axios
      .get(`${mySite}usercards/${user.user_id}`)
      .then((res) => {
        console.log(res);
        setCards(res.data.cards);
        console.log(cards);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table mb-12 table-zebra text-center w-full lg:w-1/2 mx-auto">
          <thead>
            <tr>
              <th>Palabras</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cards &&
              cards.map((card, key) => (
                <tr
                  key={key}
                  data-theme=""
                  onClick={() => toDelete.length > 0 && toggleToDelete(card.id)}
                >
                  <td>
                    <div className="font-bold">{card.cardTitle}</div>
                    <div className="text-md opacity-70">{card.cardMeaning}</div>

                    <img
                      className="w-16 h-16 mx-auto mask mask-squircle"
                      src={card.image}
                      alt=""
                    />
                    {toDelete.length > 0 && (
                      <input
                        readOnly
                        type="checkbox"
                        checked={toDelete.includes(card.id) ? true : false}
                        className="checkbox checkbox-error mt-2"
                      />
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-3 justify-center">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        onClick={() => {
                          setCardToEdit(card);
                          setModalIsOpen(true);
                        }}
                        className="w-8 h-8 text-blue-400 cursor-pointer"
                      >
                        <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        className="w-9 h-9 text-red-600 cursor-pointer active:w-5 transition-all"
                        height="1em"
                        width="1em"
                        onClick={() => toggleToDelete(card.id)}
                      >
                        <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div
          className={`fixed  w-1/2 left-1/2 text-center  -translate-x-1/2 ${
            toDelete.length > 0 ? "bottom-0" : "-bottom-16"
          }   transition-all duration-200`}
        >
          <button className="btn btn-error w-3/4 mx-auto" onClick={delCards}>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-9 h-9 text-black cursor-pointer active:w-5 transition-all"
              height="1em"
              width="1em"
            >
              <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
            </svg>
          </button>
        </div>
      </div>

      <FormCard2
        isOpen={modalIsOpen}
        handleOpen={setModalIsOpen}
        cardData={cardToEdit}
        setCardData={setCardToEdit}
        // fetchApi={fetchAPi}
      />
    </div>
  );
};

export default ModifyCards;
