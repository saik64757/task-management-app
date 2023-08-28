import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const UserCOntext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <UserCOntext.Provider value={{ user, setUser, isLoggedIn, setisLoggedIn }}>
      {children}
    </UserCOntext.Provider>
  );
}

export default UserProvider;

export const useUser = () => useContext(UserCOntext);
