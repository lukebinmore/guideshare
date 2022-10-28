import { render, screen } from "@testing-library/react";
import PostResultsCount from "../PostResultsCount";

test("renders PostResultsCount", () => {
  render(<PostResultsCount results={10} />);

  const resultsCount = screen.getByLabelText("Number of Guide Results");
  expect(resultsCount).toBeInTheDocument();
});
