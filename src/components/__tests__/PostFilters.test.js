import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchFilterSortProvider } from "../../contexts/SearchFilterSortContext";
import PostFilters from "../PostFilters";

test("renders PostFilters", () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <PostFilters />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const filterButton = screen.getByRole("button", { name: "Filters" });
  expect(filterButton).toBeInTheDocument();
});

test("renders post filter options", async () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <PostFilters />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const filterButton = screen.getByRole("button", { name: "Filters" });
  fireEvent.click(filterButton);

  const clearFilters = await screen.findByRole("button", {
    name: "Clear Filters",
  });
  const filterSelect = await screen.findByRole("combobox", { name: "" });
  expect(clearFilters).toBeInTheDocument();
  expect(filterSelect).toBeInTheDocument();
});
