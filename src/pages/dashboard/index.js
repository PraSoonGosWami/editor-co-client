import { Container, Typography } from "@material-ui/core";
import DocumentContainer from "../../components/documentsContainer";
import NavBar from "../../components/nav-bar";
import classes from "./styles.module.css";

const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" className={classes.dashboard}>
        <Typography>Your documents</Typography>
        <DocumentContainer />
      </Container>
    </>
  );
};

export default DashboardPage;
