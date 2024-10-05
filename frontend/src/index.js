/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

// Use REACT_APP_BE_URL instead of BE_URL
axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
console.log("BE_URL:", process.env.REACT_APP_BE_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <React.StrictMode>
  <App />
 </React.StrictMode>
);
