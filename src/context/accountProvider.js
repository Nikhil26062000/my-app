// import React, { createContext, useState } from 'react';

// // Create a context with default value (optional)
// export const MyContext = createContext(null);

// export const MyProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   return (
//     <MyContext.Provider value={{ token, setToken }}>
//       {children}
//     </MyContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect } from "react";

// Create the context
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // Initialize state with the token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // const api_url = "http://192.168.1.101/";
  // const api_url = "https://farmersforforests.org/";

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <MyContext.Provider value={{ token, setToken }}>
      {children}
    </MyContext.Provider>
  );
};
