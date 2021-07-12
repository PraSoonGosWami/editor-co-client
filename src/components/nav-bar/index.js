import { lazy, useState, useContext } from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Tooltip,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Button,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PrintIcon from "@material-ui/icons/Print";
import { UserContext } from "../../context/UserContext";
import SuspenseWithLoader from "../suspense-with-loader";
import goBack from "../../utils/go-back";
import {
  USER_ROLE_OWNER,
  USER_ROLE_EDITOR,
  USER_ROLE_VIEWER,
} from "../../constants";
import TopBarStyle from "../../mui-styles/top-bar-styles";

const UserMenu = lazy(() => import("../menu/user-menu"));

const NavBar = ({
  title,
  showBackButton,
  showDocOptions,
  role,
  editName,
  deleteHandler,
  shareHandler,
}) => {
  const useStyles = makeStyles((theme) => TopBarStyle(theme, showBackButton));
  const [userAnchor, setUserAnchor] = useState(null);
  const classes = useStyles();
  const { profile, logoutUser } = useContext(UserContext);
  const history = useHistory();
  const isOwner = role === USER_ROLE_OWNER;

  const openUserMenu = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const closeUserMenu = () => {
    setUserAnchor(null);
  };

  const onBackClick = () => {
    goBack(history);
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
            {title ? (
              <Typography className={classes.subTitle} onClick={editName}>
                {title}
              </Typography>
            ) : (
              <Typography className={classes.title}>Editor-co</Typography>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {showDocOptions && (
              <>
                {isOwner && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      startIcon={<PeopleAltIcon />}
                      onClick={shareHandler}
                      style={{ marginRight: 8 }}
                    >
                      Share
                    </Button>
                    <Tooltip title="Edit name">
                      <IconButton onClick={editName} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete document">
                      <IconButton color="primary" onClick={deleteHandler}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                {role === USER_ROLE_VIEWER && (
                  <Chip label="You have viewer's access" />
                )}
                {role === USER_ROLE_EDITOR && (
                  <Chip label="You have editor's access" />
                )}
                <IconButton color="primary" onClick={handlePrintButtonClick}>
                  <PrintIcon />
                </IconButton>
              </>
            )}
            <Tooltip title={profile?.name ?? ""}>
              <Avatar
                onClick={openUserMenu}
                src={profile?.imageUrl}
                className={classes.avatar}
              >
                {profile?.givenName.substring(0, 1)}
              </Avatar>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <SuspenseWithLoader>
        {userAnchor && (
          <UserMenu
            profile={profile}
            userAnchor={userAnchor}
            closeUserMenu={closeUserMenu}
            logoutUser={logoutUser}
            history={history}
          />
        )}
      </SuspenseWithLoader>
    </div>
  );
};

export default NavBar;
