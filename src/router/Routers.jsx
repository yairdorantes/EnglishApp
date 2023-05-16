import { Routes, Route } from "react-router-dom";
import Cards from "../components/Cards";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Posts from "../components/Posts";
import PostPage from "../components/PostPage";
import DeleteCards from "../components/DeleteCards";
import SubMenuCard from "../components/SubMenuCard";
import Phrases from "../components/Phrases";
import NewLogin from "../components/NewLogin";
import NewSignUp from "../components/NewSignUp";
import Quiz from "../components/Quiz";
import MyVerbs from "../components/MyVerbs";
import FormVerb from "../components/FormVerb";
import FormCard2 from "../components/FormCard2";
import ModifyCards from "../components/ModifyCards";
import LearnedWords from "../components/LearnedWords";
const Routers = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<NewSignUp />} />
        <Route path="/login" element={<NewLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cards" element={<SubMenuCard />} />
          <Route path="/cards/:section" element={<Cards />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postpage/:id" element={<PostPage />} />
          <Route path="/cards/modify" element={<ModifyCards />} />
          <Route path="/testing" element={<ModifyCards />} />
          <Route path="/phrases" element={<Phrases section="animales" />} />
          <Route path="/" element={<SubMenuCard />} />
          <Route path="/my-verbs" element={<MyVerbs />} />
          <Route path="/test" element={<Quiz />}></Route>
          <Route path="/my-verbs/add" element={<FormVerb />} />
          <Route path="/addCard" element={<FormCard2 />} />
          <Route path="/learned" element={<LearnedWords />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default Routers;
