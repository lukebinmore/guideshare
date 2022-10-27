import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const SearchFilterSortContext = createContext();
export const SetSearchFilterSortContext = createContext();

export const useSearchFilterSort = () => useContext(SearchFilterSortContext);
export const useSetSearchFilterSort = () =>
  useContext(SetSearchFilterSortContext);

const initialState = {
  query: "",
  filters: "",
  sort: "-created_at",
};

export const SearchFilterSortProvider = ({ children }) => {
  const { pathname } = useLocation();

  const [searchFilterSort, setSearchFilterSort] = useState(initialState);

  useEffect(() => {
    setSearchFilterSort(initialState);
  }, [pathname]);

  return (
    <SearchFilterSortContext.Provider value={searchFilterSort}>
      <SetSearchFilterSortContext.Provider value={setSearchFilterSort}>
        {children}
      </SetSearchFilterSortContext.Provider>
    </SearchFilterSortContext.Provider>
  );
};
