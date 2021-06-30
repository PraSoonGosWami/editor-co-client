import { useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import NavBar from "../../components/nav-bar";
import classes from "./styles.module.css";

const DashboardPage = () => {
  const { profile, logoutUser } = useContext(UserContext);
  return (
    <>
      <NavBar profile={profile} logout={logoutUser} />
      <Container maxWidth="lg" className={classes.dashboard}>
        <Typography>Your documents</Typography>
      </Container>
    </>
  );
};

export default DashboardPage;
