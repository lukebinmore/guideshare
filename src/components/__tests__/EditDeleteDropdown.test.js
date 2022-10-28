import { render, screen, fireEvent, act } from "@testing-library/react";
import EditDeleteDropdown from "../EditDeleteDropdown";

test("renders EditDeleteDropdown", () => {
  render(<EditDeleteDropdown />);

  const dropdownToggle = screen.getByRole("button", {
    name: "Edit & Delete Dropdown",
  });
  expect(dropdownToggle).toBeInTheDocument();
});

test("renders Edit amd delete buttons", () => {
  render(<EditDeleteDropdown />);

  act(() => {
    const dropdownToggle = screen.getByRole("button", {
      name: "Edit & Delete Dropdown",
    });
    fireEvent.click(dropdownToggle);
  });

  const editButton = screen.getByRole("button", { name: "Edit" });
  const deleteButton = screen.getByRole("button", { name: "Delete" });
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
