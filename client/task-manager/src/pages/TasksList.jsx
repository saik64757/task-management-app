import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../App";
import { useUser } from "../context/UserContext";
import { useList } from "../context/ListContext";
import Taskform from "../components/Taskform";
import Listitem from "../components/Listitem";
import { Toaster, toast } from "react-hot-toast";

function TasksList() {
  const token = localStorage.getItem("token");
  const { setTasks, tasks } = useList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(`${config.endpoint}/task`, {
          headers: {
            Authorization: `Bearer ${token.replace(
              /^["'](.+(?=["']$))["']$/,
              "$1"
            )}`,
          },
        });
        let newTaskList = result?.data.map((task) => {
          return {
            ...task,
            isEditing: false,
            isCompleted: false,
          };
        });
        setTasks(newTaskList);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    fetchData();
  }, [setTasks, token]);

  console.log(tasks);

  return (
    <div className="flex justify-center align-middle flex-col gap-4">
      <div className="mt-8s text-2xl w-9/12 text-center">TasksList</div>
      <Taskform />
      {tasks &&
        tasks.map((task) => (
          <div key={task._id}>
            <Listitem
              title={task.title}
              description={task.description}
              taskId={task._id}
              tasks={tasks}
              task={task}
            />
          </div>
        ))}
      <Toaster />
    </div>
  );
}

export default TasksList;
