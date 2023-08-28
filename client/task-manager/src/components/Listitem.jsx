import axios from "axios";
import { config } from "../App";
import { useList } from "../context/ListContext";
import { toast } from "react-hot-toast";
import EditTask from "../components/EditTask";

function Listitem({ title, description, taskId, task }) {
  const { setTasks, tasks } = useList();
  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    try {
      await axios.delete(`${config.endpoint}/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token.replace(
            /^["'](.+(?=["']$))["']$/,
            "$1"
          )}`,
        },
      });
      let newTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleEdit = () => {
    let newTaska = tasks.map((task) => {
      if (taskId === task._id) {
        return {
          ...task,
          isEditing: true,
        };
      }
      return { ...task, isEditing: false };
    });
    setTasks(newTaska);
  };

  const handlemarkCOmpleted = () => {
    let newTaska = tasks.map((task) => {
      if (taskId === task._id) {
        return {
          ...task,
          isCompleted: true,
        };
      }
      return task;
    });
    setTasks(newTaska);
  };

  const handleActivateTask = () => {
    let newTaska = tasks.map((task) => {
      if (taskId === task._id) {
        return {
          ...task,
          isCompleted: false,
        };
      }
      return task;
    });
    setTasks(newTaska);
  };

  return (
    <>
      {task.isEditing ? (
        <EditTask
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          taskId={taskId}
        />
      ) : (
        <div
          className={`flex rounded-2xl justify-center align-middle flex-col mx-10 p-3 ${
            task.isCompleted ? "bg-red-500" : "bg-amber-300"
          } `}
        >
          <div>
            <h5
              className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 ${
                task.isCompleted ? "text-gray-50" : "dark:text-white"
              } `}
            >
              {title}
            </h5>
            <p
              className={`font-normal text-gray-700 ${
                task.isCompleted ? "text-gray-50" : "dark:text-white"
              }`}
            >
              {description}
            </p>
            <div className="mt-2">
              {task.isCompleted ? (
                <button
                  onClick={handleActivateTask}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Activate task
                </button>
              ) : (
                <button
                  onClick={handlemarkCOmpleted}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Completed
                </button>
              )}

              {task.isCompleted ? (
                <></>
              ) : (
                <button
                  onClick={handleEdit}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Listitem;
