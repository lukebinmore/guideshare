import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthModalProvider } from "../../contexts/AuthModalContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import AdminButton from "../AdminButton";

test("renders AdminButton", async () => {
  render(
    <BrowserRouter>
      <AuthModalProvider>
        <CurrentUserProvider>
          <AdminButton />
        </CurrentUserProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );

  const adminButton = await screen.findByRole("button", {
    name: "Admin Panel",
  });
  expect(adminButton).toBeInTheDocument();
});
