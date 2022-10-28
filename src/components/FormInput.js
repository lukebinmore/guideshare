import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormError from "./FormError";
import IconText from "./IconText";

const FormInput = (props) => {
  /* Destructuring the props object. */
  const {
    className,
    type,
    initialData,
    setPreview,
    readOnly,
    name,
    label,
    children,
    variant,
    size,
    as,
    rows,
    errorData,
    text,
    hr,
  } = props;

  const [value, setValue] = useState(initialData);
  const [check, setCheck] = useState(initialData ? initialData : false);

  /* Function to handle change of file. */
  const handleFileChange = (event) => {
    setPreview(
      event.target.files[0]
        ? URL.createObjectURL(event.target.files[0])
        : initialData
    );
  };

  /* Bootstrap form control of type file with passed props. */
  const fileInput = (
    <>
      <Form.Control
        type="file"
        name={name}
        accept="image/*"
        defaultValue={initialData}
        className="d-none"
        readOnly={readOnly}
        onChange={handleFileChange}
      />

      {children}
    </>
  );

  /* Bootstrap form select with passed props. */
  const selectInput = (
    <Form.Select
      className="text-center"
      name={name}
      value={value}
      onChange={(event) => setValue(event.target.value)}>
      {children}
    </Form.Select>
  );

  /* Custom Checkbox using Bootstrap Button and Fontawesome Icons. */
  const checkInput = (
    <>
      <Button
        variant={variant}
        size={size}
        className="d-block mx-auto"
        onClick={() => setCheck(!check)}>
        <IconText
          text={label}
          icon={check ? "square-check" : "square"}
          left
          right
        />
      </Button>
      <Form.Check name={name} value={check} className="d-none" />
    </>
  );

  /* Bootstrap form control as text, with passed props. */
  const textInput = (
    <Form.Control
      as={as}
      rows={rows}
      type={type}
      placeholder={label}
      name={name}
      defaultValue={value}
      plaintext={readOnly}
      disabled={readOnly}
      className="text-center"
    />
  );

  return (
    <Form.Group className={className} controlId={name}>
      {/* Hidden label for form input. */}
      <Form.Label className="d-none">{label}</Form.Label>

      {/* Conditional insert of appropriate form element. */}
      {type === "file"
        ? fileInput
        : type === "select"
        ? selectInput
        : type === "check"
        ? checkInput
        : textInput}

      {/* FormError component with props passed. */}
      <FormError data={errorData} text={text} />
      {/* Conditional hr dependant on props. */}
      {hr && <hr />}
    </Form.Group>
  );
};

export default FormInput;
