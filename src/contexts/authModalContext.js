import { createContext, useContext, useState } from "react";

export const AuthModalContext = createContext();
export const SetAuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);
export const useSetAuthModal = () => useContext(SetAuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [authModal, setAuthModal] = useState({
    show: false,
    page: "",
  });

  return (
    <AuthModalContext.Provider value={authModal}>
      <SetAuthModalContext.Provider value={setAuthModal}>
        {children}
      </SetAuthModalContext.Provider>
    </AuthModalContext.Provider>
  );
};
