import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Typography } from "@material-ui/core";
import Editor from "../../components/editor";
import NavBar from "../../components/nav-bar";
import { DocContext } from "../../context/DocumentContext";

import classes from "./styles.module.css";

const TextEditor = () => {
  const { id: docId } = useParams();
  const { role, isFetching, data, title, error, fetchDocById } =
    useContext(DocContext);

  //fetching the document for the first time
  useEffect(() => {
    fetchDocById(docId);
  }, [docId]);

  return (
    <div className={classes.textEditor} id="text-editor-main">
      <NavBar title={title} showBackButton showDocOptions />
      {!isFetching && role && <Editor docId={docId} data={data} role={role} />}
      {error.have && (
        <div>
          <Typography>{error.message}</Typography>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
