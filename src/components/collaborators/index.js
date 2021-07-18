import { useState } from "react";
import {
  Badge,
  Fab,
  Popover,
  Avatar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
const User = ({ name, avatar }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", padding: "12px 18px" }}
    >
      <Avatar alt={name} src={avatar} style={{ marginRight: 12 }} />
      <Typography>{name}</Typography>
    </div>
  );
};

const Collaborators = ({ users }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="collaborator-fab">
      <Tooltip title="Current collaborators on the document">
        <Fab
          color="primary"
          onClick={handleClick}
          size="small"
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            textTransform: "none",
          }}
        >
          <Badge badgeContent={Object.keys(users)?.length || 0} color="error">
            <FaceIcon />
          </Badge>
        </Fab>
      </Tooltip>
      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {users &&
          Object.keys(users).map((key) => {
            const user = users[key];
            return <User key={user.id} {...user} />;
          })}
      </Popover>
    </div>
  );
};

export default Collaborators;
