import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import ImageResize from "quill-image-resize-module-react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import NavBar from "../../components/nav-bar";
import { getDocumentsById } from "../../api";
import classes from "./styles.module.css";
import "quill/dist/quill.snow.css";
import "./editor.css";

const Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "36px",
  "48px",
  "60px",
  "72px",
  "96px",
];
Quill.register(Size, true);
Quill.register("modules/cursors", QuillCursors);
Quill.register("modules/imageResize", ImageResize);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: Size.whitelist }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = ({ history }) => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [cursors, setCursor] = useState(null);
  const [role, setRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState(null);
  const { id: docId } = useParams();

  const identifyRole = () => {};

  const editorRef = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        cursors: true,
        imageResize: {
          parchment: Quill.import("parchment"),
        },
      },
    });
    q.disable();
    q.setText("Loading...");
    setCursor(q.getModule("cursors"));

    setQuill(q);
  }, []);

  //set up socket
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  //fetching the document for the first time
  useEffect(() => {
    if (!docId) return;
    setIsFetching(true);
    getDocumentsById({ docId })
      .then((res) => {
        setData(res?.data?.doc?.data);
        setRole(res?.data?.role);
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

  //populating the editor with fetched data
  useEffect(() => {
    if (!quill || data === null) return;
    quill.setContents(data);
    quill.enable();
  }, [data, quill]);

  //save changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //updates changes
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta, oldData, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    const cursorHandler = (range, oldRange, source) => {
      socket.emit("update-cursor", {
        userId: "uid",
        userName: "name",
        range,
        color: "red",
      });
    };
    quill.on("text-change", handler);
    quill.on("selection-change", cursorHandler);

    return () => {
      quill.off("text-change", handler);
      quill.off("selection-change", cursorHandler);
    };
  }, [quill, socket]);

  //fetches changes
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    const cursorHandler = ({ userId, userName, range, color }) => {
      if (range) {
        cursors.createCursor(userId, userName, color);
        cursors.moveCursor(userId, range);
        cursors.toggleFlag(userId, true);
      } else {
        console.log(userId);
        cursors.removeCursor(userId);
      }
    };

    socket.on("receive-changes", handler);
    socket.on("receive-cursor", cursorHandler);
    return () => {
      socket.off("receive-changes", handler);
      socket.off("receive-cursor", cursorHandler);
      socket.emit("update-cursor", {
        userId: "uid",
        range: null,
      });
    };
  }, [quill, socket]);

  return (
    <div className={classes.textEditor}>
      <NavBar title="How to get started with ReactJs" showBackButton />
      <div className="editor" ref={editorRef}></div>
    </div>
  );
};

export default TextEditor;
