import React from "react";
import { Form } from "react-bootstrap";

const FormError = (props) => {
  const { data, text } = props;

  if (data) {
    return (
      <>
        {data?.map((message, idx) => (
          <Form.Text key={idx} className="text-danger">
            *{message}
          </Form.Text>
        ))}
      </>
    );
  } else if (text) {
    return <Form.Text className="text-muted">{text}</Form.Text>;
  }

  return;
};

export default FormError;
