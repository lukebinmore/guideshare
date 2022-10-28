import { render, screen } from "@testing-library/react";
import Avatar from "../Avatar";

test("renders Avatar", () => {
  render(<Avatar />);

  const avatar = screen.getByAltText("Profile Picture");
  expect(avatar).toBeInTheDocument();
});

test("renders camera icon overlay", () => {
  render(<Avatar change />);

  const avatar = screen.getByAltText("Change Profile Picture");
  expect(avatar).toBeInTheDocument();
});
