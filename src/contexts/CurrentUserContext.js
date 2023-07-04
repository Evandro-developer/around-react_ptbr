import { createContext, useState, useEffect } from "react";

import api from "../utils/api";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
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

export default CurrentUserContext;
