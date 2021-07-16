import { Avatar, Typography } from "@material-ui/core";
import { useContext } from "react";
import { DocContext } from "../../context/DocumentContext";
import CustomDialog from "../custom-dialog";
import { getDate, getDateAndTime } from "../../utils//date-formatter";

const Items = ({ head, content }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 16,
      }}
    >
      <Typography
        style={{ marginRight: 24, fontWeight: "bolder", width: "110px" }}
      >
        {head}
      </Typography>
      {content}
    </div>
  );
};
const DocInfoDialog = ({ open, onClose }) => {
  const { doc, title } = useContext(DocContext);
  const {
    creator: { profile },
    createdOn,
    lastEdited: { when },
  } = doc;
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Document details"
      primaryCTA={onClose}
      primaryText={"Close"}
      onlyPrimaryCTA
    >
      <Items
        head="Owned by"
        content={
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={profile?.imageUrl}
              style={{ width: 32, height: 32, marginRight: 8 }}
            >
              {profile?.name.substring(0, 1)}
            </Avatar>
            <Typography>{profile?.name}</Typography>
          </div>
        }
      />
      <Items head="Title" content={<Typography>{title}</Typography>} />

      <Items
        head="Modified"
        content={<Typography>{getDateAndTime(when)}</Typography>}
      />
      <Items
        head="Created"
        content={<Typography>{getDate(createdOn)}</Typography>}
      />
    </CustomDialog>
  );
};

export default DocInfoDialog;
