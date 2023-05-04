import "./App.css";
import Routers from "../src/router/Routers";
import NewLeaderBoard from "./components/NewLeaderBoard";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <NewLeaderBoard />
      <Routers />
      <Toaster />
    </>
  );
}

export default App;
