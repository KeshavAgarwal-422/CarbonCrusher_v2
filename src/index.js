import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { StateContextProvider } from "./Context";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter className="w-100% max-w-[700px] h-100% bg-[#141414]">
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </BrowserRouter>
);

reportWebVitals();
