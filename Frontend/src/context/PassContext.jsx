import React, { createContext, useState } from "react";

export const PassProvider = createContext();
const PassContext = ({ children }) => {
  const [pass, setPass] = useState("");
  const [code, setCode] = useState("");
  return (
    <PassProvider.Provider value={{ pass, setPass, code, setCode }}>
      {children}
    </PassProvider.Provider>
  );
};

export default PassContext;
