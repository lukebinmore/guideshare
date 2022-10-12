import React from "react";
import { Form } from "react-bootstrap";

export default function FormError({ data }) {
  return (
    <>
      {data?.map((message, idx) => (
        <Form.Text key={idx} className="text-danger">
          *{message}
        </Form.Text>
      ))}
    </>
  );
}
