import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = ({ small }) => {
  /* Renders a Bootstrap Spinner with variablly sized loading text. */
  return (
    <div className="w-100 text-center">
      {small ? <h3>Loading</h3> : <h1>Loading</h1>}
      <Spinner animation="border" />
    </div>
  );
};

export default LoadingSpinner;
