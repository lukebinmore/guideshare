import { render, screen } from "@testing-library/react";
import VoteFooter from "../VoteFooter";

test("renders VoteFooter", () => {
  render(<VoteFooter />);

  const likeButton = screen.getByRole("button", { name: "Like" });
  const dislikeButton = screen.getByRole("button", { name: "Dislike" });
  expect(likeButton).toBeInTheDocument();
  expect(dislikeButton).toBeInTheDocument();
});
