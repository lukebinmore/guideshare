import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormError from "./FormError";
import IconText from "./IconText";

const FormInput = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const [check, setCheck] = useState(
    props.initialValue ? props.initialValue : false
  );

  return (
    <Form.Group className={props.className} controlId={props.name}>
      <Form.Label className="d-none">{props.placeholder}</Form.Label>
      {props.type === "select" ? (
        <Form.Select
          className="text-center"
          name={props.name}
          value={value}
          onChange={() => setValue()}>
          {props.children}
        </Form.Select>
      ) : props.type === "file" ? (
        <>
          <Form.Control
            type="file"
            name={props.name}
            accept="image/*"
            onChange={(event) =>
              props.setPreview(URL.createObjectURL(event.target.files[0]))
            }
            className="d-none"
          />
          {props.children}
        </>
      ) : props.type === "check" ? (
        <>
          <Button
            variant={props.variant}
            size={props.size}
            className="d-block mx-auto"
            onClick={() => setCheck(!check)}>
            <IconText
              text={props.placeholder}
              icon={check ? "square-check" : "square"}
              left
              right
            />
          </Button>
          <Form.Check name={props.name} value={check} className="d-none" />
        </>
      ) : (
        <Form.Control
          as={props.as}
          rows={props.rows}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={value}
          onChange={() => setValue()}
          className="text-center"
        />
      )}

      <FormError data={props.errorData} text={props.text} />

      {props.hr && <hr />}
    </Form.Group>
  );
};

export default FormInput;
