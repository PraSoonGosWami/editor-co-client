import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const CustomDialog = ({
  open,
  onClose,
  title,
  primaryCTA,
  primaryText,
  disabled,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={disabled}>
          Cancel
        </Button>
        <Button onClick={primaryCTA} color="primary" disabled={disabled}>
          {primaryText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
