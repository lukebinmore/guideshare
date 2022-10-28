import { createContext, useContext, useState } from "react";

/* Creating a context and a hook to use the context. */
export const AuthModalContext = createContext();
export const SetAuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);
export const useSetAuthModal = () => useContext(SetAuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [authModal, setAuthModal] = useState({
    show: false,
    page: "",
  });

  /* Return context providers. */
  return (
    <AuthModalContext.Provider value={authModal}>
      <SetAuthModalContext.Provider value={setAuthModal}>
        {children}
      </SetAuthModalContext.Provider>
    </AuthModalContext.Provider>
  );
};
