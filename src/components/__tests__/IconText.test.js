import { render, screen } from "@testing-library/react";
import IconText from "../IconText";

test("renders IconText", () => {
  render(
    <button aria-label="Container">
      <IconText text="Ecample Text" icon="house" left />
    </button>
  );

  const iconText = screen.getByRole("button", { name: "Container" });
  expect(iconText).toBeInTheDocument();
});
