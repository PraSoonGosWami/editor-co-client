import {
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Box,
  ListItemIcon,
} from "@material-ui/core";

import DescriptionIcon from "@material-ui/icons/Description";
import ProfileIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";

const UserMenu = ({
  profile,
  userAnchor,
  closeUserMenu,
  logoutUser,
  history,
}) => {
  return (
    <Menu
      anchorEl={userAnchor}
      keepMounted
      open={Boolean(userAnchor)}
      onClose={closeUserMenu}
    >
      <div
        style={{ display: "flex", alignItems: "center", padding: "8px 14px" }}
      >
        <Avatar
          src={profile?.imageUrl}
          style={{ cursor: "pointer", width: "35px", height: "35px" }}
        >
          {profile?.givenName.substring(0, 1)}
        </Avatar>
        <Box width={12} />
        <Typography>{profile?.name}</Typography>
      </div>
      <Divider />
      <MenuItem onClick={closeUserMenu}>
        <ListItemIcon>
          <ProfileIcon />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => history.push("/terms-and-condition")}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        Terms & Conditions
      </MenuItem>
      <MenuItem onClick={logoutUser}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;