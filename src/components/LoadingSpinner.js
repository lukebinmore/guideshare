import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ small }) => {
  return (
    <div className="w-100 text-center">
      {small ? <h3>Loading</h3> : <h1>Loading</h1>}
      <Spinner animation="border" />
    </div>
  );
};

export default LoadingSpinner;