import React from "react";
import { Form } from "react-bootstrap";

const PostResultsCount = ({ results }) => {
  return (
    <Form.Control
      readOnly
      defaultValue={`Results: ${results < 1000 ? results : "999+"}`}
      className="text-center"
    />
  );
};

export default PostResultsCount;
