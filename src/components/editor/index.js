import React, { useCallback, useEffect, useState, useContext } from "react";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import ImageResize from "quill-image-resize-module-react";
import { io } from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import {
  USER_ROLE_EDITOR,
  USER_ROLE_OWNER,
  USER_ROLE_VIEWER,
  USER_ROLE_UNDEFINDED,
  SERVER_URL,
} from "../../constants";
import Collaborators from "../collaborators";
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
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
  ["print"],
];

const Editor = ({ docId, role }) => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [cursors, setCursor] = useState(null);
  const [collab, setCollab] = useState(null);

  const { profile } = useContext(UserContext);

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
      scrollingContainer: "html",
    });
    q.disable();
    q.setText("Loading...");
    setCursor(q.getModule("cursors"));
    const qTbar = q.getModule("toolbar");
    qTbar.addHandler("print", () => console.log("print"));
    document
      .querySelector(".ql-print")
      .addEventListener("click", () => window.print());
    setQuill(q);
  }, []);

  //set up socket
  useEffect(() => {
    const s = io(SERVER_URL);
    setSocket(s);
    return () => {
      s.emit("update-cursor", {
        userId: profile.googleId,
        range: null,
      });
      s.disconnect();
    };
  }, []);

  //join the room
  //populating the editor with data
  useEffect(() => {
    if (!socket || !quill) return;
    socket.emit("join-room", {
      docId,
      userId: profile.googleId,
      name: profile?.name,
      avatar: profile?.imageUrl,
    });
    socket.on("load-document", (document) => {
      quill.setContents(document);
      role === USER_ROLE_EDITOR || role === USER_ROLE_OWNER
        ? quill.enable()
        : quill.disable();
    });
  }, [socket, quill, docId, profile, role]);

  //send changes
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldData, source) => {
      if (
        source !== "user" ||
        role === USER_ROLE_VIEWER ||
        role === USER_ROLE_UNDEFINDED
      )
        return;
      socket.emit("send-changes", delta);
      socket.emit("save-document", {
        data: quill.getContents(),
        userId: profile.googleId,
      });
    };
    const cursorHandler = (range, oldRange, source) => {
      if (role === USER_ROLE_VIEWER || role === USER_ROLE_UNDEFINDED) return;
      socket.emit("update-cursor", {
        userId: profile?.googleId,
        userName: profile?.name,
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
  }, [quill, socket, profile, role]);

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
        cursors.toggleFlag(userId, false);
      } else {
        cursors.removeCursor(userId);
      }
    };

    const usersHandler = (users) => {
      setCollab(users);
    };

    socket.on("receive-changes", handler);
    socket.on("receive-cursor", cursorHandler);
    socket.on("current-users", usersHandler);

    return () => {
      socket.off("receive-changes", handler);
      socket.off("receive-cursor", cursorHandler);
      socket.off("current-users", usersHandler);
    };
  }, [quill, socket, profile]);

  return (
    <>
      <div className="editor" ref={editorRef}></div>
      {collab && <Collaborators users={collab} />}
    </>
  );
};

export default Editor;
