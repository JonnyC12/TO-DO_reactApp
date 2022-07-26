import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App.js";
import Container from "./components/todocomponents.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
const titulos = ["Tareas", "Tareas sin hacer", "Tareas Terminadas"];
root.render(<Container titulos={titulos} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
