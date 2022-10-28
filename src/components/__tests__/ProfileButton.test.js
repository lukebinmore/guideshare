import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfileButton from "../ProfileButton";

test("renders FormInput", () => {
  render(
    <BrowserRouter>
      <ProfileButton profile_id={1} username="Username" />
    </BrowserRouter>
  );

  const profileButton = screen.getByRole("button", {
    name: "Username's Profile",
  });
  const label = screen.getByAltText("Profile Picture");
  expect(profileButton).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});
