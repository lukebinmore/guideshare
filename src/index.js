import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { SavedFollowedProvider } from "./contexts/SavedFollowedContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { SearchFilterSortProvider } from "./contexts/SearchFilterSortContext";
import { SiteThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* React-Router Router provider. */}
    <BrowserRouter>
      {/* Context Providers. */}
      <SiteThemeProvider>
        <AuthModalProvider>
          <CurrentUserProvider>
            <SavedFollowedProvider>
              <SearchFilterSortProvider>
                {/* Main App */}
                <App />
              </SearchFilterSortProvider>
            </SavedFollowedProvider>
          </CurrentUserProvider>
        </AuthModalProvider>
      </SiteThemeProvider>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
