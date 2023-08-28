import React, { useState } from "react";
import axios from "axios";
import { config } from "../App";
import { useList } from "../context/ListContext";
import { Toaster, toast } from "react-hot-toast";

function Taskform() {
  const [taskDetails, settaskDetails] = useState({
    title: "",
    description: "",
  });
  const token = localStorage.getItem("token");
  const { setTasks } = useList();

  const handleChange = (e) => {
    settaskDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.post(`${config.endpoint}/task`, taskDetails, {
        headers: {
          Authorization: `Bearer ${token.replace(
            /^["'](.+(?=["']$))["']$/,
            "$1"
          )}`,
        },
      });

      if (result.status === 200) {
        settaskDetails({
          title: "",
          description: "",
        });
        setTasks((prev) => [
          ...prev,
          { ...result.data, isEditing: false, isCompleted: false },
        ]);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <form action="submit">
      <div className=" mx-44 bg-red-500 p-6 rounded-xl">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Task Title
        </label>
        <input
          onChange={handleChange}
          name="title"
          rows="1"
          value={taskDetails.title}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Task Title"
        />

        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Task Description
        </label>
        <input
          onChange={handleChange}
          rows="2"
          value={taskDetails.description}
          name="description"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Task Description"
        />

        <button
          onClick={handleSubmit}
          type="button"
          className="text-white mt-6  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
      <Toaster />
    </form>
  );
}

export default Taskform;
