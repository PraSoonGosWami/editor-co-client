import { CircularProgress } from "@material-ui/core";
const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;
