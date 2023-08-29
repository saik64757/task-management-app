import axios from "axios";
import React, { useState } from "react";
import { config } from "../App";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Login() {
  const [userdetails, setUserdetails] = useState({});
  const navigate = useNavigate();

  const { setUser, setisLoggedIn } = useUser();

  const handleChange = (e) => {
    setUserdetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let user = await axios.post(`${config.endpoint}/user/login`, userdetails);
      if (user.status === 200) {
        toast.success("User Login Successfully");
      }
      localStorage.setItem("token", JSON.stringify(user?.data?.token));
      setUser(user);
      setisLoggedIn(true);
      navigate("/tasks");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center w-[60.5rem] h-[25.5rem]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4" onChange={handleChange}>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
