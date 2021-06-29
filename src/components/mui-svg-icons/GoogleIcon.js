import { SvgIcon } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/googleLogo.svg";

const GoogleIcon = ({ size }) => {
  return (
    <SvgIcon>
      <Logo />
    </SvgIcon>
  );
};

export default GoogleIcon;
