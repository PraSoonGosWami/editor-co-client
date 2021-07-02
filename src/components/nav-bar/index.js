import { useState, useContext } from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Tooltip,
  Typography,
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Box,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProfileIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";
import { UserContext } from "../../context/UserContext";
import TopBarStyle from "../../mui-styles/top-bar-styles";

const NavBar = ({ title, showBackButton }) => {
  const useStyles = makeStyles((theme) => TopBarStyle(theme, showBackButton));
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const { profile, logoutUser } = useContext(UserContext);

  const history = useHistory();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onBackClick = () => {
    history.push("/dashboard");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root + " nav-bar-app"}>
      <AppBar
        className={classes.AppBar}
        position={"relative"}
        color={"inherit"}
        elevation={0}
      >
        <Toolbar>
          <div className={classes.AppBarHeader}>
            {showBackButton && (
              <IconButton className={classes.BackButton} onClick={onBackClick}>
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            )}
            <Typography className={classes.title}>Editor-co</Typography>
          </div>
          {title && (
            <Typography className={classes.subTitle}>{title}</Typography>
          )}
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
        <MenuItem onClick={logoutUser}>
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
