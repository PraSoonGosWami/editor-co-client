import { Checkbox, FormControlLabel } from "@material-ui/core";
const CustomCheckbox = ({ label, ...otherProps }) => {
  return (
    <FormControlLabel
      style={{ marginLeft: "-12px" }}
      control={<Checkbox color="primary" {...otherProps} />}
      label={label}
    />
  );
};

export default CustomCheckbox;
