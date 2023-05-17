import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import mySite from "./Domain";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
const customStyles = {
  content: {
    // color: "white",

    height: "350px",
    backgroundColor: "#00000000",
    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const FormCard2 = ({
  cardData,
  setCardData,
  isOpen,
  handleOpen,
  cards,
  setCards,
}) => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [imageType, setImageType] = useState("file");
  const { user } = useContext(AuthContext);

  const handleFiles = (file) => {
    setFileName(file.fileList[0].name);
    setCardData({ ...cardData, image: file.base64 });
  };
  const sendData = (e) => {
    console.log(cardData);
    e.preventDefault();
    if (cardData.cardTitle.length < 23 && cardData.cardMeaning.length < 23) {
      if (!cardData.owner_id) {
        axios
          .post(`${mySite}cards/`, { ...cardData, owner_id: user.user_id })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Enviado con éxito!");
              // console.log(cardData);

              setCards([cardData, ...cards]);
              setTimeout(() => {
                handleOpen(false);
              }, 500);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Ups algo salio mal");
          });
      } else {
        axios
          .put(`${mySite}card-edit/${cardData.id}`, cardData)
          .then((res) => {
            if (res.status === 200) toast.success("Datos actualizados!");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Ups algo salio mal");
          });
      }
    } else {
      toast.error("Demasiado texto");
    }
  };

  useEffect(() => {
    // setCards(["xd"]);
  }, []);
  return (
    <Modal
      className="modal-form-card w-[90%] md:w-96 mx-auto mt-44"
      ariaHideApp={false}
      style={customStyles}
      isOpen={isOpen}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          handleOpen(!isOpen);
        }}
      >
        <form
          className="bg-slate-800 p-5 w-[90%] md:w-96 rounded-lg mx-auto "
          onSubmit={sendData}
        >
          {/* <Toaster /> */}
          <div className="form-control w-full mx-auto  max-w-xs">
            <label className="label">
              <span className="label-text ">Palabra en ingles</span>
            </label>
            <input
              type="text"
              onChange={(e) =>
                setCardData({ ...cardData, cardTitle: e.target.value })
              }
              placeholder="Word"
              value={cardData.cardTitle}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text ">Traduccion</span>
            </label>
            <input
              type="text"
              placeholder="Palabra"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) =>
                setCardData({ ...cardData, cardMeaning: e.target.value })
              }
              value={cardData.cardMeaning}
            />
            <div className="mt-5">
              <label
                onClick={() => {
                  setFileName("");
                  setCardData({ ...cardData, image: "" });
                }}
                className="label cursor-pointer bg-gray-800  p-3 mb-3"
              >
                <span className="label-text text-lg">
                  Enviar Imagen como URL
                </span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  readOnly
                  onClick={() => setImageType("url")}
                  checked={imageType === "url"}
                />
              </label>
              <label
                onClick={() => setCardData({ ...cardData, image: "" })}
                className="label cursor-pointer bg-gray-800  p-3 rounded-lg"
              >
                <span className="label-text text-lg">
                  Enviar imagen como archivo
                </span>
                <input
                  type="radio"
                  name="radio-10"
                  onClick={() => {
                    setImageType("file");
                  }}
                  checked={imageType === "file"}
                  readOnly
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            {imageType === "url" ? (
              <>
                <label className="label">
                  <span className="label-text ">URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Direccion de la imagen"
                  onChange={(e) =>
                    setCardData({ ...cardData, image: e.target.value })
                  }
                  value={cardData.image}
                  className="input input-bordered w-full max-w-xs"
                />
              </>
            ) : (
              <div className="relative mt-4 mx-auto text-center w-full">
                <ReactFileReader handleFiles={handleFiles} base64={true}>
                  <label
                    htmlFor="file"
                    className="badge p-5 font-extrabold  badge-primary"
                  >
                    Selecciona tu archivo
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="w-8 h-8"
                    >
                      <path d="M854.6 288.7L639.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.6-9.4-22.6zM400 402c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zm296 294H328c-6.7 0-10.4-7.7-6.3-12.9l99.8-127.2a8 8 0 0112.6 0l41.1 52.4 77.8-99.2a8 8 0 0112.6 0l136.5 174c4.3 5.2.5 12.9-6.1 12.9zm-94-370V137.8L790.2 326H602z" />
                    </svg>
                  </label>
                </ReactFileReader>
                <div className="mt-2  truncate w-full ">{fileName}</div>
              </div>
            )}
            <button
              type="submit"
              className={`btn ${
                cardData.title !== "" &&
                cardData.meaning !== "" &&
                cardData.image !== ""
                  ? "btn-success"
                  : "btn-disabled"
              } mt-4`}
            >
              Enviar
            </button>
          </div>
        </form>
      </OutsideClickHandler>
    </Modal>
  );
};

export default FormCard2;