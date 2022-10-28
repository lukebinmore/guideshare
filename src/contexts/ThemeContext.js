import React, { createContext, useContext, useEffect, useState } from "react";

const LightTheme = React.lazy(() => import("../themes/LightTheme"));
const DarkTheme = React.lazy(() => import("../themes/DarkTheme"));

/* Creating a context and a hook to use the context. */
export const SiteThemeContext = createContext();
export const SetSiteThemeContext = createContext();

export const useSiteTheme = () => useContext(SiteThemeContext);
export const useSetSiteTheme = () => useContext(SetSiteThemeContext);

export const SiteThemeProvider = ({ children }) => {
  const [siteTheme, setSiteTheme] = useState("light");

  /* Function to set the initial site theme on mount. Defaults to light
  theme if none set. */
  useEffect(() => {
    setSiteTheme(localStorage.getItem("THEME") || "light");
  }, []);

  /* Returns the context providers. */
  return (
    <SiteThemeContext.Provider value={siteTheme}>
      <SetSiteThemeContext.Provider value={setSiteTheme}>
        <React.Suspense fallback={<></>}>
          {siteTheme === "light" ? <LightTheme /> : <DarkTheme />}
        </React.Suspense>
        {children}
      </SetSiteThemeContext.Provider>
    </SiteThemeContext.Provider>
  );
};
