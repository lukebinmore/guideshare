import { render, screen } from "@testing-library/react";
import FormError from "../FormError";

test("renders FormError", () => {
  render(<FormError text="Example Text" />);

  const formText = screen.getByText("Example Text");
  expect(formText).toBeInTheDocument();
});

test("renders FormError error data", () => {
  render(<FormError data={["This field is required."]} />);

  const formError = screen.getByText("*This field is required.");
  expect(formError).toBeInTheDocument();
});
