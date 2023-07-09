import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar>
        <Link to="/" className={styles.link}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/add" className={styles.link}>
          <Button color="inherit">Add</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
