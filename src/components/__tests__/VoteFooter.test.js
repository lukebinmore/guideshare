import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import VoteFooter from "../VoteFooter";

test("renders VoteFooter", async () => {
  render(
    <BrowserRouter>
      <CurrentUserProvider>
        <VoteFooter />
      </CurrentUserProvider>
    </BrowserRouter>
  );

  const likeButton = await screen.findByRole("button", { name: "Like" });
  const dislikeButton = await screen.findByRole("button", { name: "Dislike" });
  expect(likeButton).toBeInTheDocument();
  expect(dislikeButton).toBeInTheDocument();
});
