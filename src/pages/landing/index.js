import { useContext, useEffect } from "react";
import ReactGA from "react-ga";
import GoogleLogin from "react-google-login";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import appLogo from "../../assets/app-logo.png";
import { UserContext } from "../../context/UserContext";
import GoogleSigninButton from "../../components/buttons/google-sign-in";
import { GOOGLE_CLIENT_ID } from "../../constants";
import classes from "./styles.module.css";

const LandingPage = ({ history, location }) => {
  const { profile, signinUser } = useContext(UserContext);
  const alert = useAlert();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.title = "Editor-Co | Collaborative text editor";
  }, []);

  useEffect(() => {
    profile && history.replace(location?.state?.from?.pathname || "/dashboard");
  }, [profile, history, location]);

  const googleSuccess = (res) => {
    const { googleId, profileObj: profile, tokenId: token } = res;
    signinUser({ googleId, profile, token });
  };
  const googleFailure = (err) => {
    alert.error("Something went wrong! Cannot login");
  };

  return (
    <div className={classes.landing}>
      <section className={classes.landingIntro}>
        <img src={appLogo} alt="Editor-Co" />
        <Typography>A basic realtime collaborative text editor</Typography>
        <Typography>Let's get started</Typography>
      </section>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <GoogleSigninButton clickHandler={renderProps.onClick}>
            Continue with Google
          </GoogleSigninButton>
        )}
      />
    </div>
  );
};

export default LandingPage;
