import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthModalProvider } from "../../contexts/AuthModalContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { SavedFollowedProvider } from "../../contexts/SavedFollowedContext";
import FollowProfileButton from "../FollowProfileButton";

test("renders AdminButton", async () => {
  render(
    <BrowserRouter>
      <AuthModalProvider>
        <CurrentUserProvider>
          <SavedFollowedProvider>
            <FollowProfileButton id={2} />
          </SavedFollowedProvider>
        </CurrentUserProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );

  const followButton = await screen.findByRole("button", {
    name: "Follow",
  });
  expect(followButton).toBeInTheDocument();
});
