import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchFilterSortProvider } from "../../contexts/SearchFilterSortContext";
import PostSearch from "../PostSearch";

test("renders PostSearch", () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <PostSearch />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const newPostButton = screen.getByRole("link", { name: "New Post" });
  const searchBox = screen.getByRole("searchbox", { name: "" });
  const searchButton = screen.getAllByRole("button", { name: "Search" });
  expect(newPostButton).toBeInTheDocument();
  expect(searchBox).toBeInTheDocument();
  expect(searchButton[1]).toBeInTheDocument();
});
