import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthModalProvider } from "../../contexts/AuthModalContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavButton from "../NavButton";

test("renders AdminButton", async () => {
  render(
    <BrowserRouter>
      <AuthModalProvider>
        <CurrentUserProvider>
          <NavButton to="feed" />
        </CurrentUserProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );

  const navButton = await screen.findByRole("link", {
    name: "Feed",
  });
  expect(navButton).toBeInTheDocument();
});
