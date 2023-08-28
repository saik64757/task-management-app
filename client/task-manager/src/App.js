import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

export const config = {
  endpoint: `http://127.0.0.1:3001`,
};

function App() {
  return (
    <div className="flex justify-center align-middle flex-col ">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
