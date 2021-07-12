import { Typography, Button } from "@material-ui/core";
import classes from "./styles.module.css";

const ErrorComponent = ({ text, action, actionText }) => {
  return (
    <div className={classes.errorComponent}>
      <Typography variant="h4">{text}</Typography>
      {action && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={action}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
