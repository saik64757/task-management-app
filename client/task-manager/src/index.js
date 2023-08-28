import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import TasksList from "./pages/TasksList";
import UserProvider from "./context/UserContext.js";
import ListProvider from "./context/ListContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/tasks",
        element: <TasksList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ListProvider>
        <RouterProvider router={router} />
      </ListProvider>
    </UserProvider>
  </React.StrictMode>
);
