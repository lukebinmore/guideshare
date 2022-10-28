import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ThemeButton from "../ThemeButton";

test("renders ThemeButton", () => {
  render(
    <BrowserRouter>
      <ThemeButton />
    </BrowserRouter>
  );

  const themeButton = screen.getByRole("button", { name: "Change Theme" });
  expect(themeButton).toBeInTheDocument();
});
