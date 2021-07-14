import { useContext, useState, useRef } from "react";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CustomCheckbox from "../custom-checkbox";
import CustomDialog from "../custom-dialog";
import { DocContext } from "../../context/DocumentContext";
import checkDuplicate from "../../utils/check-duplicate";
import validateEmail from "../../utils/validiate-email";

const UpdareShareDialog = ({ open, onClose }) => {
  const {
    doc: { _id, editors, viewers, private: prv },
    alert,
    setDoc,
    manageDocSharing,
  } = useContext(DocContext);
  const [isPrivate, setIsPrivate] = useState(prv || false);
  const [editorsArr, setEditorsArr] = useState(editors || []);
  const [viewersArr, setViewersArr] = useState(viewers || []);
  const [viewerError, setViewerError] = useState("");
  const [editorError, setEditorError] = useState("");
  const [updating, setUpdating] = useState(false);

  const editorFormRef = useRef();
  const viewerFormRef = useRef();

  const switchHandler = (event) => {
    setIsPrivate(event.target.checked);
  };

  const editorFromHandler = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    if (!validateEmail(email)) {
      setEditorError("Invalid email");
      return;
    }
    if (checkDuplicate(editorsArr, email)) {
      setEditorError("Email already present");
      return;
    }
    setEditorError("");
    setEditorsArr((prevState) => [...prevState, email]);
    editorFormRef.current.reset();
  };

  const viewerFromHandler = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    if (!validateEmail(email)) {
      setViewerError("Invalid email");
      return;
    }
    if (checkDuplicate(viewersArr, email)) {
      setViewerError("Email already present");
      return;
    }
    setViewerError("");
    setViewersArr((prevState) => [...prevState, email]);
    viewerFormRef.current.reset();
  };

  const updateDocument = () => {
    setUpdating(true);
    manageDocSharing(_id, editorsArr, viewersArr, isPrivate)
      .then((res) => {
        setDoc((prevState) => ({
          ...prevState,
          private: isPrivate,
          editors: editorsArr,
          viewers: viewersArr,
        }));
        alert.success("Sharing settings updated");
        onClose();
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message || "Something went wrong!");
        setUpdating(false);
      });
  };

  const deleteEmails = (fromEditor, index) => {
    const arr = fromEditor ? [...editorsArr] : [...viewersArr];
    arr.splice(index, 1);
    fromEditor ? setEditorsArr([...arr]) : setViewersArr([...arr]);
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Manage sharing"
      primaryCTA={updateDocument}
      primaryText={"Update"}
      disabled={updating}
      secondaryDisabled={updating}
    >
      <div style={{ width: "350px", marginBottom: "20px" }}>
        <CustomCheckbox
          label="Private"
          onChange={switchHandler}
          defaultChecked={isPrivate}
        />
        <Typography style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)" }}>
          {isPrivate
            ? "(Only the users with whom you share this document can view or edit)"
            : "(Any one with the URL can view this document)"}
        </Typography>
      </div>

      <Typography style={{ fontSize: "14px", maxWidth: 400 }}>
        Enter email and then press enter or tap on check button on the right to
        add email to the list. Finally tap on update button to save changes
      </Typography>
      <Box height={8} />

      <Divider />
      <Box height={8} />
      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <Typography>Manage editors</Typography>
        <form onSubmit={editorFromHandler} ref={editorFormRef}>
          <TextField
            autoFocus
            margin="dense"
            label="Add editors"
            type="email"
            fullWidth
            error={Boolean(editorError)}
            helperText={editorError}
            placeholder="abc@gmail.com"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <DoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Box height={8} />
        {editorsArr.map((editor, index) => (
          <Chip
            label={editor}
            variant="outlined"
            size="small"
            key={editor}
            onDelete={() => deleteEmails(true, index)}
          />
        ))}
      </div>

      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <Typography>Manage viewers</Typography>
        <form onSubmit={viewerFromHandler} ref={viewerFormRef}>
          <TextField
            autoFocus
            margin="dense"
            label="Add viewers"
            type="email"
            fullWidth
            error={Boolean(viewerError)}
            helperText={viewerError}
            placeholder="abc@gmail.com"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <DoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>

        <Box height={8} />
        {viewersArr.map((viewer, index) => (
          <Chip
            label={viewer}
            variant="outlined"
            size="small"
            onDelete={() => deleteEmails(false, index)}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 400,
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
        <Typography style={{ fontSize: "14px", marginLeft: 6, marginTop: 2 }}>
          Currently only gmail accounts are supported for sharing.
        </Typography>
      </div>
    </CustomDialog>
  );
};

export default UpdareShareDialog;
