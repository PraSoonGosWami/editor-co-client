import { useState } from "react";
import { useHistory } from "react-router";
import { TextField, Typography } from "@material-ui/core";
import CustomCheckbox from "../custom-checkbox";
import { createNewDocument } from "../../api";
import CustomDialog from "../custom-dialog";

const NewDocumentDialog = ({ showDialog, handleClose }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [docName, setDocName] = useState("untitled");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const switchHandler = (event) => {
    setIsPrivate(event.target.checked);
  };
  const textChangeHandler = (event) => {
    const value = event.target.value;
    setDocName(value);
    setError(false);
  };

  //rest to add new document
  const addNewDocument = () => {
    if (!docName || docName.length === 0) {
      setError(true);
      return;
    }
    setPosting(true);
    createNewDocument({ name: docName, private: isPrivate })
      .then((res) => {
        history.push(`/doc/${res?.data?.id}`);
      })
      .catch((err) => {
        setPosting(false);
      });
  };
  return (
    <CustomDialog
      open={showDialog}
      onClose={handleClose}
      title="Create new document"
      primaryCTA={addNewDocument}
      primaryText={posting ? "Please wait.." : "Create"}
      disabled={posting}
      secondaryDisabled={posting}
    >
      <TextField
        autoFocus
        margin="dense"
        label="Document title"
        type="text"
        error={error}
        helperText={error && "Name can't be empty"}
        fullWidth
        value={docName}
        onChange={textChangeHandler}
      />
      <CustomCheckbox label="Private" onChange={switchHandler} />
      <Typography style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)" }}>
        {isPrivate
          ? "(Only the users with whom you share this document can view or edit)"
          : "(Any one with the URL can view this document)"}
      </Typography>
    </CustomDialog>
  );
};

export default NewDocumentDialog;
