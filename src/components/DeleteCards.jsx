import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import pencil from "../media/lapiz.png";
import delIcon from "../media/delete.png";
import Modal from "react-modal";
import "./styles/modifyCards.css";
import FormCard from "./FormCard";
import mySite from "./Domain";
import NewMenu from "./NewMenu";
import FormCard2 from "./FormCard2";

const customStyles = {
  content: {
    // color: "white",

    width: "350px",
    height: "350px",
    backgroundColor: "#00000000",

    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#171515ce" },
};
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";
const DeleteCards = () => {
  let { user } = useContext(AuthContext);

  const [cards, setCards] = useState();
  // const [cardsAPI, setCardsAPI] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardId, setCardId] = useState();
  const [actualCardTitle, setActualCardTitle] = useState("");
  const [cardToEdit, setCardToEdit] = useState();
  const [editOrDelete, setEditOrDelete] = useState();
  //   const [actualCardImg, setActualCardImg] = useState("");
  const fetchAPi = async () => {
    let url = `${mySite}usercards/${user.user_id}`;

    const response = await fetch(url);
    const responseJSON = await response.json();
    setCards(responseJSON);
    // setCardsAPI(responseJSON);
    console.log(responseJSON);
  };
  const deleteCardF = () => {
    let urlDel = `${mySite}delcard/${cardId}`;

    helpHttp()
      .del(urlDel)
      .then((res) => {
        console.log(res);
        setModalIsOpen(false);
        fetchAPi();
        localStorage.removeItem("user_cards");
      });
  };
  const openModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const getCurrentData = (title, id) => {
    setEditOrDelete("del");
    setActualCardTitle(title);
    setCardId(id);
    // setActualCardImg(img);
  };
  const editCard = (editCard) => {
    setEditOrDelete("put");
    setCardToEdit(editCard);
    console.log(editCard);
  };
  const searchCard = (e) => {
    const query = e.target.value.toLowerCase();
    console.log(query);
    if (cards && cards.cards) {
      const results = cards.cards.filter((card) => {
        return (
          card.cardTitle.toLowerCase().includes(query) ||
          card.cardMeaning.toLowerCase().includes(query)
        );
      });
      if (results.length === 0 || query === "") {
        console.log("empty");
        setCards(JSON.parse(localStorage.getItem("user_cards")));
      } else {
        setCards({ cards: results });
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user_cards")) {
      setCards(JSON.parse(localStorage.getItem("user_cards")));
    } else {
      fetchAPi();
    }
  }, []);

  return (
    <>
      <NewMenu />

      <div className="h-[100vh] bg-primary-content">
        <div className="w-10/12 sm:w-1/2 mx-auto">
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
                placeholder="Busca tus cartas..."
                required
                onChange={searchCard}
              />
            </div>
          </form>
        </div>
        <div className="container-cards-delete">
          {!cards ? (
            <Loader></Loader>
          ) : !cards.cards ? (
            <div>Nada para borrar</div>
          ) : (
            cards.cards.map((card) => {
              return (
                <div key={card.id} className="container-card-delete">
                  <h3 style={{ textAlign: "center", margin: "5px" }}>
                    <div className="font-bold">{card.cardTitle}</div>
                    <div className="">({card.cardMeaning})</div>
                  </h3>
                  <img
                    className="delete-img-card"
                    src={
                      card.cardImage === ""
                        ? card.imageURL
                        : urlImageCard + card.cardImage
                    }
                    alt=""
                  />
                  <div className="container-icons-edit">
                    <img
                      onClick={() => {
                        openModal();
                        editCard(card);
                      }}
                      className="pencil-icon"
                      src={pencil}
                      alt=""
                    />
                    <img
                      onClick={() => {
                        openModal();
                        getCurrentData(card.cardTitle, card.id);
                      }}
                      className="del-icon"
                      src={delIcon}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
        {editOrDelete === "put" && (
          <FormCard2
            isOpen={modalIsOpen}
            handleOpen={setModalIsOpen}
            initialData={{
              user: user.user_id,
              title: cardToEdit.cardTitle,
              meaning: cardToEdit.cardMeaning,
              file: "",
              img_url: "",
              idCard: cardToEdit.id,
            }}
            // fetchApi={fetchAPi}
          />
        )}
        {editOrDelete === "del" && (
          <Modal
            className="modal-delete-card"
            ariaHideApp={false}
            style={customStyles}
            isOpen={modalIsOpen}
          >
            <div className="text-center">
              <div className="font-bold">
                <h2>
                  ¡Se eliminara la carta:
                  <span className="bg-white text-black ml-1 p-1 rounded-md">
                    {actualCardTitle}
                  </span>
                  !
                </h2>
              </div>
              <button
                onClick={deleteCardF}
                className="btn btn-error w-1/4 m-2 font-bold"
              >
                <h3>ok</h3>
              </button>
              <button
                className="btn btn-warning w-1/4 m-2 font-bold"
                onClick={openModal}
              >
                <h3>Cancelar</h3>
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default DeleteCards;
