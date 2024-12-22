import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.js";
import "./index.css";


createRoot(document.getElementById("root")as HTMLElement).render(
  <StrictMode>
    <Toaster
  toastOptions={{
    className: '',
    style: {
      border: '1px solid #713200',
      paddingLeft: '50px',
      paddingRight: '50px',
      color: '#713200',
    },
  }}
/>
    <App />
  </StrictMode>
);
