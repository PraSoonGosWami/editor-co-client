import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Typography } from "@material-ui/core";
import { DocContext } from "../../context/DocumentContext";
import goBack from "../../utils/go-back";
import CustomDialog from "../custom-dialog";
const DeleteAlert = ({ open, onClose }) => {
  const history = useHistory();
  const {
    doc: { _id },
    title,
    alert,
    deleteDocById,
  } = useContext(DocContext);
  const [error, setError] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);

  const textChangeHandler = (event) => {
    const value = event.target.value;
    value !== title ? setError(true) : setError(false);
  };

  const primaryCTAHandler = () => {
    setDisableButtons(true);
    deleteDocById(_id)
      .then((res) => {
        alert.success("Document deleted");
        goBack(history);
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message || "Something went wrong");
        goBack(history);
      });
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      primaryCTA={primaryCTAHandler}
      primaryText="Delete"
      title="Are you sure you want to delete this document permanently?"
      disabled={error || disableButtons}
      secondaryDisabled={disableButtons}
    >
      <Typography>{title}</Typography>
      <TextField
        autoFocus
        margin="dense"
        label="Enter document title"
        type="text"
        error={error}
        fullWidth
        onChange={textChangeHandler}
      />
    </CustomDialog>
  );
};

export default DeleteAlert;
