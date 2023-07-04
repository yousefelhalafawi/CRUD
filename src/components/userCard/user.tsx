import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import  { useEffect } from 'react';

import styles from './UserCard.module.css';

interface UserCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  id: string; // Add the id prop
  onDelete: () => void; // Add the onDelete prop
}

const UserCard: React.FC<UserCardProps> = ({ imageSrc, title, onClick, id, onDelete }) => {
  // useEffect(() => {
  //   console.log(title)
  // }, []);


  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        className={styles.media}
        image={imageSrc}
        alt="Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className={styles.title}>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/user/${id}`}>
          <Button size="small" color="primary" onClick={onClick}>
            VIEW
          </Button>
        </Link>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(UserCard);
