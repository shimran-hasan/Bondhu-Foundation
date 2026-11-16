import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
<<<<<<< HEAD
import CardStudio from "./CardStudio.jsx";
import "./styles.css";
const Page = window.location.pathname.startsWith("/studio") ? CardStudio : App;
createRoot(document.getElementById("root")).render(<React.StrictMode><Page/></React.StrictMode>);
=======
import "./styles.css";
createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
>>>>>>> 8c310ee99bf1474734a2671225b7506f5dcd95a5
