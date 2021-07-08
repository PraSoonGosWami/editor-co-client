import { lazy, Suspense, useState } from "react";
import { Menu, MenuItem, ListItemIcon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const DeleteAlert = lazy(() => import("../delete-alert"));

const DocMenu = ({ docAnchor, closeDocMenu }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const toggleDeleteHandler = () => {
    setDeleteAlert((prevState) => !prevState);
  };

  const copyLinkHandler = () => {
    const url = window?.location?.href;
    if (url) {
      navigator?.clipboard?.writeText(url);
      alert("Copied to clipboard", url);
    }
  };

  return (
    <>
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
        <MenuItem onClick={copyLinkHandler}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          Copy link
        </MenuItem>
        <MenuItem onClick={toggleDeleteHandler}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Suspense fallback="">
        {deleteAlert && (
          <DeleteAlert
            open={deleteAlert}
            toggleDeleteHandler={toggleDeleteHandler}
          />
        )}
      </Suspense>
    </>
  );
};

export default DocMenu;
