import { render, screen } from "@testing-library/react";
import FormInput from "../FormInput";

test("renders FormInput", () => {
  render(<FormInput name="text" label="Text" text="Text Input" />);

  const formInput = screen.getByPlaceholderText("Text");
  const formLabel = screen.getByLabelText("Text");
  const formText = screen.getByText("Text Input");
  expect(formInput).toBeInTheDocument();
  expect(formLabel).toBeInTheDocument();
  expect(formText).toBeInTheDocument();
});

test("renders select FormInput", () => {
  render(
    <FormInput type="select" name="select" label="Select" text="Select Input" />
  );

  const formInput = screen.getByRole("combobox", { name: "Select" });
  const formLabel = screen.getByLabelText("Select");
  const formText = screen.getByText("Select Input");
  expect(formInput).toBeInTheDocument();
  expect(formLabel).toBeInTheDocument();
  expect(formText).toBeInTheDocument();
});

test("renders select FormInput", () => {
  render(
    <FormInput type="check" name="check" label="Check" text="Check Input" />
  );

  const formInput = screen.getByRole("button", { name: "Check" });
  const formLabel = screen.getByLabelText("Check");
  const formText = screen.getByText("Check Input");
  expect(formInput).toBeInTheDocument();
  expect(formLabel).toBeInTheDocument();
  expect(formText).toBeInTheDocument();
});
