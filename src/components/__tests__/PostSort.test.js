import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchFilterSortProvider } from "../../contexts/SearchFilterSortContext";
import PostSort from "../PostSort";

test("renders PostSort", () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <PostSort />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const sortButton = screen.getByRole("button", { name: "Sort Menu" });
  expect(sortButton).toBeInTheDocument();
});

test("renders sorting options", async () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <PostSort />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const sortButton = screen.getByRole("button", { name: "Sort Menu" });
  fireEvent.click(sortButton);

  const titleSort = await screen.getByText("Title");
  expect(titleSort).toBeInTheDocument();
});
