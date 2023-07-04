import { createContext, useState, useEffect } from "react";
import api from "../../utils/api";

export const CurrentUserContext = createContext(null);

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.getUserInfo().then((response) => {
      setCurrentUser(response);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
