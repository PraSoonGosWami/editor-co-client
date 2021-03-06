import React, { useEffect, useContext, useState, lazy } from "react";
import { useParams, useHistory } from "react-router";
import ReactGA from "react-ga";
import Editor from "../../components/editor";
import Loader from "../../components/loader";
import NavBar from "../../components/nav-bar";
import SuspenseWithLoader from "../../components/suspense-with-loader";
import { DocContext } from "../../context/DocumentContext";
import classes from "./styles.module.css";
import goBack from "../../utils/go-back";

const DeleteAlert = lazy(() => import("../../components/delete-alert"));
const DocInfoDialog = lazy(() => import("../../components/doc-info-dialog"));
const EditNameDialog = lazy(() => import("../../components/edit-name-dialog"));
const ErrorComponent = lazy(() => import("../../components/error-component"));
const UpdareShareDialog = lazy(() =>
  import("../../components/update-share-dialog")
);

const TextEditor = () => {
  const { id: docId } = useParams();
  const { role, isFetching, title, error, fetchDocById } =
    useContext(DocContext);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const history = useHistory();

  //fetching the document for the first time
  useEffect(() => {
    fetchDocById(docId);
    ReactGA.pageview("/doc");
  }, [docId]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  const toggleEditNameHandler = () => {
    setShowNameDialog((prevState) => !prevState);
  };

  const toggleDeleteHandler = () => {
    setShowDeleteAlert((prevState) => !prevState);
  };

  const toggleShareHandler = () => {
    setShowShareDialog((prevState) => !prevState);
  };

  const toggleInfoHandler = () => {
    setShowInfoDialog((prevState) => !prevState);
  };

  return (
    <div className={classes.textEditor} id="text-editor-main">
      {isFetching ? (
        <Loader />
      ) : (
        role && (
          <>
            <NavBar
              title={title}
              showBackButton
              showDocOptions
              role={role}
              editName={toggleEditNameHandler}
              deleteHandler={toggleDeleteHandler}
              shareHandler={toggleShareHandler}
              infoHandler={toggleInfoHandler}
            />
            <Editor docId={docId} role={role} />
            <SuspenseWithLoader>
              {showDeleteAlert && (
                <DeleteAlert
                  open={showDeleteAlert}
                  onClose={toggleDeleteHandler}
                />
              )}
              {showNameDialog && (
                <EditNameDialog
                  open={showNameDialog}
                  onClose={toggleEditNameHandler}
                />
              )}
              {showShareDialog && (
                <UpdareShareDialog
                  open={showShareDialog}
                  onClose={toggleShareHandler}
                />
              )}
              {showInfoDialog && (
                <DocInfoDialog
                  open={showInfoDialog}
                  onClose={toggleInfoHandler}
                />
              )}
            </SuspenseWithLoader>
          </>
        )
      )}
      {error.have && (
        <ErrorComponent
          text={error.message}
          action={() => goBack(history)}
          actionText="Back to home"
        />
      )}
    </div>
  );
};

export default TextEditor;
