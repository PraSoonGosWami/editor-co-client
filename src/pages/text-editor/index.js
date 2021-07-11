import React, { useEffect, useContext, useState, lazy, Suspense } from "react";
import { useParams } from "react-router";
import { Typography } from "@material-ui/core";
import Editor from "../../components/editor";
import NavBar from "../../components/nav-bar";
import { DocContext } from "../../context/DocumentContext";
import classes from "./styles.module.css";

const DeleteAlert = lazy(() => import("../../components/delete-alert"));
const EditNameDialog = lazy(() => import("../../components/edit-name-dialog"));

const TextEditor = () => {
  const { id: docId } = useParams();
  const { role, isFetching, doc, title, error, fetchDocById } =
    useContext(DocContext);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  //fetching the document for the first time
  useEffect(() => {
    fetchDocById(docId);
  }, [docId]);

  const toggleEditNameHandler = () => {
    setShowNameDialog((prevState) => !prevState);
  };

  const toggleDeleteHandler = () => {
    setShowDeleteAlert((prevState) => !prevState);
  };

  return (
    <div className={classes.textEditor} id="text-editor-main">
      <NavBar
        title={title}
        showBackButton
        showDocOptions
        editName={toggleEditNameHandler}
        deleteHandler={toggleDeleteHandler}
      />
      {!isFetching && role && (
        <Editor docId={docId} data={doc?.data} role={role} />
      )}
      {error.have && (
        <div>
          <Typography>{error.message}</Typography>
        </div>
      )}
      <Suspense fallback="">
        {showDeleteAlert && (
          <DeleteAlert open={showDeleteAlert} onClose={toggleDeleteHandler} />
        )}
        {showNameDialog && (
          <EditNameDialog
            open={showNameDialog}
            onClose={toggleEditNameHandler}
          />
        )}
      </Suspense>
    </div>
  );
};

export default TextEditor;
