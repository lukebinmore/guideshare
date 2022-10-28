import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchFilterSortProvider } from "../../contexts/SearchFilterSortContext";
import NavBar from "../NavBar";

const pageTitles = {
  "/": "Home",
  "/feed": "Feed",
  "/saved": "Saved",
};

test("renders NavBar", () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <NavBar titles={pageTitles} />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const navbarButton = screen.getByRole("button", { name: "Navigation Menu" });
  const accountButton = screen.getByRole("button", { name: "Login / Sign Up" });
  expect(navbarButton).toBeInTheDocument();
  expect(accountButton).toBeInTheDocument();
});

test("renders navbar menu options", async () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <NavBar titles={pageTitles} />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const navbarButton = screen.getByRole("button", { name: "Navigation Menu" });
  fireEvent.click(navbarButton);

  const feedButton = await screen.findByRole("link", { name: "Feed" });
  const savedButton = await screen.findByRole("link", { name: "Saved" });
  expect(feedButton).toBeInTheDocument();
  expect(savedButton).toBeInTheDocument();
});

test("renders account menu options", async () => {
  render(
    <BrowserRouter>
      <SearchFilterSortProvider>
        <NavBar titles={pageTitles} />
      </SearchFilterSortProvider>
    </BrowserRouter>
  );

  const accountButton = screen.getByRole("button", { name: "Login / Sign Up" });
  fireEvent.click(accountButton);

  const loginButton = await screen.findByRole("button", { name: "Login" });
  const signupButton = await screen.findByRole("button", { name: "Sign Up" });
  expect(loginButton).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});
