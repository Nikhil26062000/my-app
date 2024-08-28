import React, { createContext, useContext, useState } from 'react';


const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ headerFooterColor: '#125B57' }); 

  const setHeaderFooterColor = (color) => {
    setSession((prevSession) => ({ ...prevSession, headerFooterColor: color }));
  };

  return (
    <SessionContext.Provider value={{ session, setHeaderFooterColor }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
