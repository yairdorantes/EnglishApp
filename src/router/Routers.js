import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cards from "../components/Cards";
import Exercises from "../components/Exercises";
import Listening from "../components/Listening";
import LoginPage from "../components/LoginPage";
import Menu from "../components/Menu";
import Shorts from "../components/Shorts";
import { helpHttp } from "../helpers/helpHttp";
const Routers = () => {
  return (
    <Routes>
      <Route path="/signup" element={<LoginPage />}></Route>
      <Route path="/menu" element={<Menu />}></Route>
      <Route path="/cards" element={<Cards />}></Route>
      <Route path="/exercises" element={<Exercises />}></Route>
      <Route path="/listening" element={<Listening />}></Route>
      <Route path="/shorts" element={<Shorts />}></Route>
    </Routes>
  );
};

export default Routers;
