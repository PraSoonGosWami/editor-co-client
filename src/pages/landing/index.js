import { useContext } from "react";
import GoogleLogin from "react-google-login";
import { Typography } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import GoogleSigninButton from "../../components/buttons/google-sign-in";
import classes from "./styles.module.css";

const LandingPage = () => {
  const { signinUser } = useContext(UserContext);
  const googleSuccess = (res) => {
    const { googleId, profileObj: profile, tokenId: token } = res;
    signinUser({ googleId, profile, token });
  };
  const googleFailure = (err) => {
    console.log(err);
  };
  return (
    <div className={classes.landing}>
      <section className={classes.landingIntro}>
        <Typography variant="h2">Editor-Co</Typography>
        <Typography>A basic realtime collaborative text editor</Typography>
        <Typography>Let's get started</Typography>
      </section>
      <GoogleLogin
        clientId="32272026461-hpch5mbll357l8ksb5bvfi2v85p0togg.apps.googleusercontent.com"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
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
