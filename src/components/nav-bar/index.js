import { useState } from "react";
import {
  Avatar,
  Tooltip,
  Typography,
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  Divider,
  Box,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";
import TopBarStyle from "../../mui-styles/top-bar-styles";

const useStyles = makeStyles((theme) => TopBarStyle(theme));

const NavBar = ({ profile, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.AppBar}
        position="sticky"
        color={"inherit"}
        elevation={0}
      >
        <Toolbar>
          <Typography className={classes.title}>Editor-co</Typography>
          <Tooltip title={profile?.name ?? ""}>
            <Avatar
              onClick={handleMenuClick}
              src={profile?.imageUrl}
              style={{ cursor: "pointer", width: "35px", height: "35px" }}
            >
              {profile?.givenName.substring(0, 1)}
            </Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavBar;
