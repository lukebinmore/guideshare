import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthModalProvider } from "../../contexts/AuthModalContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { SavedFollowedProvider } from "../../contexts/SavedFollowedContext";
import SavePostButton from "../SavePostButton";

test("renders AdminButton", async () => {
  render(
    <BrowserRouter>
      <AuthModalProvider>
        <CurrentUserProvider>
          <SavedFollowedProvider>
            <SavePostButton id={2} />
          </SavedFollowedProvider>
        </CurrentUserProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );

  const savePostButton = await screen.findByRole("button", {
    name: "Save Post",
  });
  expect(savePostButton).toBeInTheDocument();
});
