import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

export const config = {
  endpoint: `https://task-management-app-ydrf.onrender.com`,
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
