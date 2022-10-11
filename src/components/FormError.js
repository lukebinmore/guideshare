import React from "react";
import { Alert } from "react-bootstrap";

export default function FormError({ data }) {
  return (
    <>
      {data?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
    </>
  );
}
