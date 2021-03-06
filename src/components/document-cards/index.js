import { useHistory } from "react-router";
import { Typography, Tooltip } from "@material-ui/core";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { getDate } from "../../utils/date-formatter";
import classes from "./styles.module.css";
const DocumentCard = ({
  _id,
  name,
  private: isPrivate,
  createdOn,
  lastEdited,
  accessText,
}) => {
  const history = useHistory();
  const onClick = () => {
    history.push(`/doc/${_id}`);
  };
  return (
    <div className={classes.documentCard} onClick={onClick}>
      <Tooltip title={name}>
        <Typography variant="h6">{name}</Typography>
      </Tooltip>
      <Typography>Last edited {getDate(lastEdited?.when)}</Typography>

      <section className={classes.documentCardInfo}>
        <Typography>Created {getDate(createdOn)}</Typography>
        {isPrivate ? (
          <Tooltip title="Document is private">
            <LockOutlinedIcon fontSize="small" />
          </Tooltip>
        ) : (
          <Tooltip title="Document is public">
            <LockOpenOutlinedIcon fontSize="small" />
          </Tooltip>
        )}
      </section>
      {accessText && (
        <Typography className={classes.accessText}>{accessText}</Typography>
      )}
    </div>
  );
};

export default DocumentCard;
