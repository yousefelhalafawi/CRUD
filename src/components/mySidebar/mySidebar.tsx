import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Menu as MenuIcon } from "@mui/icons-material";

const MySidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: String) => {
    return location.pathname === path;
  };

  const getListItemStyles = (path: String) => {
    const activeStyles = {
      backgroundColor: "#1289FA",
      color: "#FFFFFF",
      borderRadius: " 20px 0px 0px 20px",
      margin: "10px 0px 10px 0px",
    };

    const inactiveStyles = {};

    return isActive(path)
      ? { ...activeStyles, transition: "background-color 500ms" }
      : { ...inactiveStyles, transition: "background-color 500ms" };
  };

  const getIconStyles = (path: String) => {
    return isActive(path)
      ? {
          color: "#FFFFFF",
        }
      : {};
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
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
          <ListItem
            button
            component={Link}
            to="/search"
            selected={isActive("/search")}
            style={getListItemStyles("/search")}
          >
            <ListItemIcon>
              <FontAwesomeIcon
                icon={faSearch}
                style={getIconStyles("/search")}
              />
            </ListItemIcon>
            <ListItemText primary="search" />
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

          <ListItem button disabled>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MySidebar;
