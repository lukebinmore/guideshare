import React from "react";
import Form from "react-bootstrap/Form";

const PostResultsCount = ({ results }) => {
  return (
    <Form.Control
      aria-label="Number of Guide Results"
      readOnly
      defaultValue={`Results: ${results < 1000 ? results : "999+"}`}
      className="text-center"
    />
  );
};

export default PostResultsCount;
