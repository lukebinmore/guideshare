import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormError from "./FormError";
import IconText from "./IconText";

const FormInput = (props) => {
  const {
    initialValue,
    name,
    placeholder,
    className,
    type,
    children,
    setPreview,
    variant,
    size,
    as,
    rows,
    errorData,
    text,
    hr,
  } = props;

  const [value, setValue] = useState(initialValue);
  const [check, setCheck] = useState(initialValue ? initialValue : false);

  return (
    <Form.Group className={className} controlId={name}>
      <Form.Label className="d-none">{placeholder}</Form.Label>
      {type === "select" ? (
        <Form.Select
          className="text-center"
          name={name}
          value={value}
          onChange={() => setValue()}>
          {children}
        </Form.Select>
      ) : type === "file" ? (
        <>
          <Form.Control
            type="file"
            name={name}
            accept="image/*"
            onChange={(event) =>
              setPreview(
                event.target.files[0] &&
                  URL.createObjectURL(event.target.files[0])
              )
            }
            className="d-none"
          />
          {children}
        </>
      ) : type === "check" ? (
        <>
          <Button
            variant={variant}
            size={size}
            className="d-block mx-auto"
            onClick={() => setCheck(!check)}>
            <IconText
              text={placeholder}
              icon={check ? "square-check" : "square"}
              left
              right
            />
          </Button>
          <Form.Check name={name} value={check} className="d-none" />
        </>
      ) : (
        <Form.Control
          as={as}
          rows={rows}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={() => setValue()}
          className="text-center"
        />
      )}

      <FormError data={errorData} text={text} />

      {hr && <hr />}
    </Form.Group>
  );
};

export default FormInput;
