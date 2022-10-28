import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

test("renders LoadingSpinner", () => {
  render(<LoadingSpinner />);

  const loadingSpinner = screen.getByText("Loading");
  expect(loadingSpinner).toBeInTheDocument();
});
