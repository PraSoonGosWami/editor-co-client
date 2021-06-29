import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GoogleIcon from "../../mui-svg-icons/GoogleIcon";
import { CustomGoogleButtonStyle } from "../../../mui-styles/button-styles";

const useStyles = makeStyles(CustomGoogleButtonStyle);

const CustomGoogleButton = ({
  children,
  fullWidth,
  clickHandler,
  ...otherProps
}) => {
  const styles = useStyles();

  const handleOnClick = () => {
    clickHandler();
  };

  return (
    <Button
      fullWidth={fullWidth}
      variant={"contained"}
      startIcon={<GoogleIcon />}
      className={styles.root}
      onClick={handleOnClick}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default CustomGoogleButton;
