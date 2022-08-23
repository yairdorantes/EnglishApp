import { Routes, Route } from "react-router-dom";
import Cards from "../components/Cards";
import Exercises from "../components/Exercises";
import Listening from "../components/Listening";
import Menu from "../components/Menu";
const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}></Route>
      <Route path="/cards" element={<Cards />}></Route>
      <Route path="/exercises" element={<Exercises />}></Route>
      <Route path="/listening" element={<Listening />}></Route>
    </Routes>
  );
};

export default router;
