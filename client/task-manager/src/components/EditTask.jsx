import axios from "axios";
import React, { useState } from "react";
import { config } from "../App";
import { Toaster, toast } from "react-hot-toast";

function EditTask({ task, tasks, setTasks, taskId }) {
  const token = localStorage.getItem("token");
  const [newvalue, Setnewvalue] = useState({
    title: task.title,
    description: task.description,
  });
  const handleSave = async () => {
    try {
      let result = await axios.put(
        `${config.endpoint}/task/${taskId}`,
        newvalue,
        {
          headers: {
            Authorization: `Bearer ${token.replace(
              /^["'](.+(?=["']$))["']$/,
              "$1"
            )}`,
          },
        }
      );

      let newTaskList = tasks?.map((task) => {
        if (task._id === taskId) {
          return {
            ...result.data,
            isEditing: false,
            isCompleted: false,
          };
        }
        return task;
      });
      setTasks(newTaskList);
    } catch (error) {
      toast.error(error.response);
    }
  };

  const handlecancel = () => {
    const newTaskState = tasks.map((task) => {
      return { ...task, isEditing: false };
    });
    setTasks(newTaskState);
  };

  const handleChange = (e) => {
    Setnewvalue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className=" mx-10 p-3  bg-amber-300 rounded-xl">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Task Title
      </label>
      <input
        onChange={handleChange}
        rows="1"
        name="title"
        value={newvalue.title}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Task Title"
      />

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Task Description
      </label>
      <input
        name="description"
        rows="2"
        onChange={handleChange}
        value={newvalue.description}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Task Description"
      />

      <button
        onClick={handleSave}
        type="button"
        className="text-white mt-6  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save
      </button>
      <button
        onClick={handlecancel}
        type="button"
        className="text-white mt-6  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Cancel
      </button>
      <Toaster />
    </div>
  );
}

export default EditTask;
