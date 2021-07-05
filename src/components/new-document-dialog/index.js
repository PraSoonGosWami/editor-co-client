import { useState } from "react";
import { useHistory } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import CustomCheckbox from "../custom-checkbox";
import { createNewDocument } from "../../api";

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
    <Dialog open={showDialog} onClose={handleClose}>
      <DialogTitle>Create new document</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={posting}>
          Cancel
        </Button>
        <Button onClick={addNewDocument} color="primary" disabled={posting}>
          {posting ? "Please wait.." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewDocumentDialog;
