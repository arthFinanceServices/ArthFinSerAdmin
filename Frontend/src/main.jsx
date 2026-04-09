import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import PassContext from "./context/PassContext.jsx";
// import EmployeeDashboard fr om "./components/EmployeeDashboad.jsx";

createRoot(document.getElementById("root")).render(
  <PassContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PassContext>,
  
);
