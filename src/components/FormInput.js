import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormError from "./FormError";
import IconText from "./IconText";

const FormInput = (props) => {
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

  const handleFileChange = (event) => {
    setPreview(
      event.target.files[0]
        ? URL.createObjectURL(event.target.files[0])
        : initialData
    );
  };

  const fileInput = (
    <>
      <Form.Control
        type="file"
        name={name}
        accept="image/*"
        defaultValue={initialData}
        className="d-none"
        onChange={handleFileChange}
      />

      {children}
    </>
  );

  const selectInput = (
    <Form.Select
      className="text-center"
      name={name}
      value={value}
      onChange={(event) => setValue(event.target.value)}>
      {children}
    </Form.Select>
  );

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
      onChange={(event) => setValue(event.target.value)}
      className="text-center"
    />
  );

  return (
    <Form.Group className={className} controlId={name}>
      <Form.Label className="d-none">{label}</Form.Label>

      {type === "file"
        ? fileInput
        : type === "select"
        ? selectInput
        : type === "check"
        ? checkInput
        : textInput}

      <FormError data={errorData} text={text} />
      {hr && <hr />}
    </Form.Group>
  );
};

export default FormInput;
