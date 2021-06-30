import { Card, Typography, Tooltip } from "@material-ui/core";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { getDate } from "../../utils/date-formatter";
import classes from "./styles.module.css";
const DocumentCard = ({ name, private: isPrivate, createdOn, lastEdited }) => {
  return (
    <div className={classes.documentCard}>
      <header>
        <img
          src="https://freepikpsd.com/media/2019/10/document-png-icon-2-Transparent-Images.png"
          alt="document icon"
        />
      </header>

      <Typography variant="h6">{name}</Typography>
      <section className={classes.documentCardInfo}>
        <Typography>Created {getDate(createdOn)}</Typography>
        {isPrivate ? (
          <LockOutlinedIcon fontSize="small" />
        ) : (
          <LockOpenOutlinedIcon fontSize="small" />
        )}
      </section>
    </div>
  );
};

export default DocumentCard;
