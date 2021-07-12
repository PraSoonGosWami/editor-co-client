import { useState, useContext } from "react";
import { TextField } from "@material-ui/core";
import CustomDialog from "../custom-dialog";
import { DocContext } from "../../context/DocumentContext";

const EditNameDialog = ({ open, onClose }) => {
  const {
    doc: { _id },
    title,
    alert,
    updateDocInfo,
    setTitle,
  } = useContext(DocContext);
  const [docName, setDocName] = useState(title || "untitled");
  const [disabled, setDisabled] = useState(true);
  const [textError, setTextError] = useState(false);

  const textChangeHandler = (event) => {
    const value = event.target.value;
    value === title ? setDisabled(true) : setDisabled(false);
    setDocName(value);
    setTextError(false);
  };

  //rest to add new document
  const updateDocumentName = async () => {
    if (!docName || docName.length === 0 || !_id) {
      setTextError(true);
      return;
    }
    setDisabled(true);
    updateDocInfo(_id, docName)
      .then((res) => {
        setTitle(docName);
        alert.success("Title updated");
        onClose();
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message || "Something went wrong!");
        setDisabled(false);
      });
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Edit name"
      primaryCTA={updateDocumentName}
      primaryText={"Update"}
      disabled={textError || disabled}
    >
      <div style={{ minWidth: 300 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Document title"
          type="text"
          error={textError}
          helperText={textError && "Name can't be empty"}
          fullWidth
          value={docName}
          onChange={textChangeHandler}
        />
      </div>
    </CustomDialog>
  );
};

export default EditNameDialog;
