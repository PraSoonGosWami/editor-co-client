import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Editor from "../../components/editor";
import NavBar from "../../components/nav-bar";
import {
  USER_ROLE_EDITOR_OWNERR,
  USER_ROLE_VIEWER,
  USER_ROLE_UNDEFINDED,
} from "../../constants";
import { getDocumentsById } from "../../api";
import classes from "./styles.module.css";

const TextEditor = () => {
  const [role, setRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("Untitled document");
  const { id: docId } = useParams();

  const identifyRole = () => {};

  //fetching the document for the first time
  useEffect(() => {
    if (!docId) return;
    setIsFetching(true);

    getDocumentsById({ docId })
      .then((res) => {
        setData(res?.data?.doc?.data);
        setTitle(res?.data?.doc?.name);
        const roleData = res?.data?.role;
        if (!roleData) setRole(USER_ROLE_UNDEFINDED);
        if (roleData === "editor" || roleData === "owner")
          setRole(USER_ROLE_EDITOR_OWNERR);
        if (roleData === "viewer") setRole(USER_ROLE_VIEWER);
      })
      .catch((err) => {
        const { status, data } = err?.response;
        //redirect to 404 page
        if (status === 404) alert(data?.message);
        //alert with no permissions
        if (status === 401) alert(data?.message);
        console.error(err?.response);
      })
      .finally(() => setIsFetching(false));
  }, [docId]);

  return (
    <div className={classes.textEditor} id="text-editor-main">
      <NavBar title={title} showBackButton showDocOptions />
      {!isFetching && role && <Editor docId={docId} data={data} role={role} />}
    </div>
  );
};

export default TextEditor;
