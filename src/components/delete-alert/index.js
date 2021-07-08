import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Typography } from "@material-ui/core";
import { DocContext } from "../../context/DocumentContext";
import CustomDialog from "../custom-dialog";
const DeleteAlert = ({ open, toggleDeleteHandler }) => {
  const history = useHistory();
  const {
    doc: { _id, name },
    deleteDocById,
  } = useContext(DocContext);
  const [error, setError] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);

  const textChangeHandler = (event) => {
    const value = event.target.value;
    value !== name ? setError(true) : setError(false);
  };

  const primaryCTAHandler = () => {
    setDisableButtons(true);
    deleteDocById(_id)
      .then((res) => {
        console.log(res);
        history.length > 2 ? history.goBack() : history.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err?.response);
        alert(err?.response?.data?.message);
        history.length > 2 ? history.goBack() : history.replace("/dashboard");
      });
  };

  return (
    <CustomDialog
      open={open}
      onClose={toggleDeleteHandler}
      primaryCTA={primaryCTAHandler}
      primaryText="Delete"
      title="Are you sure you want to delete this document permanently?"
      disabled={error || disableButtons}
      secondaryDisabled={disableButtons}
    >
      <Typography>{name}</Typography>
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
