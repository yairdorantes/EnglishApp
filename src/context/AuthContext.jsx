import axios from "axios";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mySite from "../components/Domain";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  console.log(user);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (datos = {}) => {
    // e.preventDefault();
    console.log(datos);

    let response = await fetch(`${mySite}token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: datos.username,

        password: datos.password,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      console.log("success");
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Ups, algo salió mal intentalo de nuevo");
    }
  };
  // const newLogin = async ()=>{

  // }
  // let loginAfterSignUp =()=>{

  // }

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    // localStorage.removeItem("authTokens");
    for (let key in localStorage) {
      localStorage.removeItem(key);
    }
    navigate("/login");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
