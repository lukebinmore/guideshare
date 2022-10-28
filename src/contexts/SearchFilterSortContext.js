import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

/* Creating a context and a hook to use the context. */
export const SearchFilterSortContext = createContext();
export const SetSearchFilterSortContext = createContext();

export const useSearchFilterSort = () => useContext(SearchFilterSortContext);
export const useSetSearchFilterSort = () =>
  useContext(SetSearchFilterSortContext);

/* Setting the initial state of the context. */
const initialState = {
  query: "",
  filters: "",
  sort: "-created_at",
};

export const SearchFilterSortProvider = ({ children }) => {
  /* Getting the pathname from the URL. */
  const { pathname } = useLocation();

  const [searchFilterSort, setSearchFilterSort] = useState(initialState);

  /* Function to reset the data in the state on page change. */
  useEffect(() => {
    setSearchFilterSort(initialState);
  }, [pathname]);

  /* Return the context providers. */
  return (
    <SearchFilterSortContext.Provider value={searchFilterSort}>
      <SetSearchFilterSortContext.Provider value={setSearchFilterSort}>
        {children}
      </SetSearchFilterSortContext.Provider>
    </SearchFilterSortContext.Provider>
  );
};
