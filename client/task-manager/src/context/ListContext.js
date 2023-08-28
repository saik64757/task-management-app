import { createContext, useContext } from "react";
import { useState } from "react";

const ListContext = createContext();

function ListProvider({ children }) {
  const [tasks, setTasks] = useState();
  return (
    <ListContext.Provider value={{ setTasks, tasks }}>
      {children}
    </ListContext.Provider>
  );
}

export default ListProvider;

export const useList = () => useContext(ListContext);
