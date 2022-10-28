import React from "react";
import Form from "react-bootstrap/Form";

const FormError = (props) => {
  /* Destructuring the props object. */
  const { data, text } = props;

  /* Checking if the data is true, if it is, it will return the data. 
  If it is not, it will return the text. */
  if (data) {
    return (
      <>
        {/* Mapping over the error data in the array, and creating Bootstrap
        elements for each. */}
        {data?.map((message, idx) => (
          <Form.Text key={idx} className="text-danger">
            *{message}
          </Form.Text>
        ))}
      </>
    );
  } else if (text) {
    /* Returning the advisory text in a Bootstrap element. */
    return <Form.Text className="text-muted">{text}</Form.Text>;
  }

  return;
};

export default FormError;
