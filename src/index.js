import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/IndexColors.module.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/currentUserContext";
import { AuthModalProvider } from "./contexts/authModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <AuthModalProvider>
          <App />
        </AuthModalProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
