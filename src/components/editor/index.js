import React, { useCallback, useEffect, useState, useContext } from "react";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import ImageResize from "quill-image-resize-module-react";
import { io } from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import getRandomColor from "../../utils/generate-color";
import {
  USER_ROLE_EDITOR,
  USER_ROLE_OWNER,
  USER_ROLE_VIEWER,
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
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  ["blockquote", "code-block"],
  ["image", "video"],
  ["clean"],
  ["print"],
];

const Editor = ({ docId, role }) => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [cursors, setCursor] = useState(null);
  const [collab, setCollab] = useState(null);
  const [cursorColor] = useState(getRandomColor());
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
        history: {
          userOnly: true,
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

  //save changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", {
        data: quill.getContents(),
        userId: profile.googleId,
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, profile]);

  //send changes
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldData, source) => {
      if (source !== "user" || !role || role === USER_ROLE_VIEWER) return;
      socket.emit("send-changes", delta);
    };

    const cursorHandler = (range, oldRange, source) => {
      if (!role || role === USER_ROLE_VIEWER) return;
      socket.emit("update-cursor", {
        userId: profile?.googleId,
        userName: profile?.name,
        range,
        color: cursorColor,
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
