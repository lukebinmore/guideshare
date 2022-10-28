import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthModalProvider } from "../../contexts/AuthModalContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import AuthButton from "../AuthButton";

test("renders AdminButton", async () => {
  render(
    <BrowserRouter>
      <AuthModalProvider>
        <CurrentUserProvider>
          <AuthButton page="joinUs" />
        </CurrentUserProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );

  const authButton = await screen.findByRole("button", {
    name: "Join Us",
  });
  expect(authButton).toBeInTheDocument();
});
