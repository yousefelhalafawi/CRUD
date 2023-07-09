import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';


const   FABButton: React.FC = () => {
    const [nav, setNav] = useState(true);
  
    return (
      <>
        {nav ? (
          <Link to="/add" onClick={() => setNav(!nav)}>
            <div >
              <Fab color="warning" aria-label="add">
                <FontAwesomeIcon icon={faPlus} />
              </Fab>
            </div>
          </Link>
        ) : (
          <Link to="/" onClick={() => setNav(!nav)}>
            <div >
              <Fab color="primary" aria-label="add">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Fab>
            </div>
          </Link>
        )}
      </>
    );
  };
  export default FABButton;