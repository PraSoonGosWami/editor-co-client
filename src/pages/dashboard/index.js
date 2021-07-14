import { useState, lazy, useEffect } from "react";
import { Container, Tab, Tabs, Fab } from "@material-ui/core";
import ReactGA from "react-ga";
import DocAddIcon from "@material-ui/icons/PostAdd";
import NavBar from "../../components/nav-bar";
import SuspenseWithLoader from "../../components/suspense-with-loader";
import { LOCAL_STORAGE_TUTORIAL } from "../../constants";
import classes from "./styles.module.css";

const MyDocuments = lazy(() => import("../../components/my-documents"));
const SharedDocuments = lazy(() => import("../../components/shared-documents"));
const NewDocumentDialog = lazy(() =>
  import("../../components/new-document-dialog")
);
const TutorialDialog = lazy(() => import("../../components/tutorial-dialog"));

const DashboardPage = ({ history, location }) => {
  const [value, setValue] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const tut = localStorage.getItem(LOCAL_STORAGE_TUTORIAL);
    if (!tut) {
      setShowTutorial(true);
      localStorage.setItem(LOCAL_STORAGE_TUTORIAL, false);
    }
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    query.get("tab-index") === "1" ? setValue(1) : setValue(0);
  }, [location]);

  const handleChange = (event, newValue) => {
    history.push({ search: `tab-index=${newValue}` });
  };

  const openDialog = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  const closeTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" className={classes.dashboard}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="My documents" value={0} />
          <Tab label="Shared with me" value={1} />
        </Tabs>
        <SuspenseWithLoader>
          {!value ? (
            <MyDocuments value={value} index={0} />
          ) : (
            <SharedDocuments value={value} index={1} />
          )}
          {showDialog && (
            <NewDocumentDialog open={showDialog} onClose={closeDialog} />
          )}
          {showTutorial && (
            <TutorialDialog open={showTutorial} onClose={closeTutorial} />
          )}
        </SuspenseWithLoader>
        <Fab color="primary" className={classes.addFab} onClick={openDialog}>
          <DocAddIcon />
        </Fab>
      </Container>
    </>
  );
};

export default DashboardPage;
