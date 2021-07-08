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
  secondaryDisabled,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={secondaryDisabled}>
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
