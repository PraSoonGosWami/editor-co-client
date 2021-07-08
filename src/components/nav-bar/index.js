import { lazy, Suspense, useState, useContext } from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Tooltip,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PrintIcon from "@material-ui/icons/Print";
import { UserContext } from "../../context/UserContext";
import TopBarStyle from "../../mui-styles/top-bar-styles";

const DocMenu = lazy(() => import("../menu/doc-menu"));
const UserMenu = lazy(() => import("../menu/user-menu"));

const NavBar = ({ title, showBackButton, showDocOptions }) => {
  const useStyles = makeStyles((theme) => TopBarStyle(theme, showBackButton));
  const [userAnchor, setUserAnchor] = useState(null);
  const [docAnchor, setDocAnchor] = useState(null);
  const classes = useStyles();
  const { profile, logoutUser } = useContext(UserContext);

  const history = useHistory();

  const oepnUserMenu = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const closeUserMenu = () => {
    setUserAnchor(null);
  };

  const openDocMenu = (event) => {
    setDocAnchor(event.currentTarget);
  };

  const closeDocMenu = () => {
    setDocAnchor(null);
  };

  const onBackClick = () => {
    history.push("/dashboard");
  };

  const handlePrintButtonClick = () => {
    window.print();
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
          <div style={{ display: "flex", alignItems: "center" }}>
            {showDocOptions && (
              <>
                <IconButton color="primary" onClick={handlePrintButtonClick}>
                  <PrintIcon />
                </IconButton>
                <Tooltip title="Document options">
                  <IconButton color="primary" onClick={openDocMenu}>
                    <AppsIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title={profile?.name ?? ""}>
              <Avatar
                onClick={oepnUserMenu}
                src={profile?.imageUrl}
                style={{
                  cursor: "pointer",
                  width: "35px",
                  height: "35px",
                  marginLeft: "12px",
                }}
              >
                {profile?.givenName.substring(0, 1)}
              </Avatar>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <Suspense fallback={""}>
        {userAnchor && (
          <UserMenu
            profile={profile}
            userAnchor={userAnchor}
            closeUserMenu={closeUserMenu}
            logoutUser={logoutUser}
            history={history}
          />
        )}
        {docAnchor && (
          <DocMenu docAnchor={docAnchor} closeDocMenu={closeDocMenu} />
        )}
      </Suspense>
    </div>
  );
};

export default NavBar;
