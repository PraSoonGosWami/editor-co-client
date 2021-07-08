import {
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Box,
  ListItemIcon,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const DocMenu = ({ docAnchor, closeDocMenu }) => {
  return (
    <Menu
      anchorEl={docAnchor}
      keepMounted
      open={Boolean(docAnchor)}
      onClose={closeDocMenu}
    >
      <MenuItem onClick={closeDocMenu}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Change info
      </MenuItem>

      <MenuItem onClick={closeDocMenu}>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        Manage sharing
      </MenuItem>
      <MenuItem onClick={closeDocMenu}>
        <ListItemIcon>
          <FileCopyIcon />
        </ListItemIcon>
        Copy link
      </MenuItem>
      <MenuItem onClick={closeDocMenu}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default DocMenu;
