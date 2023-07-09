import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faBox,
  faEnvelope,
  faImages,
  faComments,
  faNewspaper,
  faTrashAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const getListItemStyles = (path: string) => {
    const activeStyles = {
      backgroundColor: "#1289FA",
      color: "#FFFFFF",
      borderRadius: " 20px 0px 0px 20px",
    };

    const inactiveStyles = {};

    return isActive(path)
      ? { ...activeStyles, transition: "background-color 300ms" }
      : { ...inactiveStyles, transition: "background-color 300ms" };
  };

  const getIconStyles = (path: string) => {
    return isActive(path)
      ? {
          color: "#FFFFFF",
        }
      : {};
  };

  return (
    <Drawer variant="permanent" style={{ marginRight: "10%" }}>
      <List>
        <ListItem button disabled></ListItem>
        <ListItem button disabled></ListItem>
        <ListItem button disabled>
          <ListItemText primary="Welcome Back" />
        </ListItem>
        <ListItem button disabled></ListItem>

        <ListItem
          button
          component={Link}
          to="/"
          selected={isActive("/")}
          style={getListItemStyles("/")}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faUser} style={getIconStyles("/")} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/add"
          selected={isActive("/add")}
          style={getListItemStyles("/add")}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faPlus} style={getIconStyles("/add")} />
          </ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FontAwesomeIcon icon={faBox} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FontAwesomeIcon icon={faEnvelope} />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FontAwesomeIcon icon={faImages} />
          </ListItemIcon>
          <ListItemText primary="Media" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FontAwesomeIcon icon={faComments} />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FontAwesomeIcon icon={faNewspaper} />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem
          button
          disabled
          component={Link}
          to="/deleted-users"
          selected={isActive("/deleted-users")}
          style={getListItemStyles("/deleted-users")}
        >
          <ListItemIcon>
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={getIconStyles("/deleted-users")}
            />
          </ListItemIcon>
          <ListItemText primary="Deleted Users" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
