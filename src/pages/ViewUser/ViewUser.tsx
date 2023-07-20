import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styles from "./ViewUser.module.css";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useGetRequest from "../../hooks/useFetchData";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { fetchedData, loading, error } = useGetRequest(
    "http://example.com/api/data"
  );

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditClick = () => {
    navigate(`/user/` + user?._id);
  };

  const fetchUser = () => {
    axios
      .get("http://localhost:8080/api/v1/users/" + id)
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  interface User {
    _id: string;
    firstName: string;
    middleName: string;
    thirdName: string;
    image: string;
    email: string;
    address: string;
    birthDate: string;
    gender: string;
    ssn: number;
  }

  return user ? (
    <Box className={styles.container}>
      <Paper className={styles.paper}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6">User Details</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <img src={user.image} alt="User" className={styles.img} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">
              <strong>First Name:</strong> {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">
              <strong>Middle Name:</strong> {user.middleName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">
              <strong>Third Name:</strong> {user.thirdName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Address:</strong> {user.address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>SSN:</strong> {user.ssn}
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="primary"
          className={styles.btn}
          icon={<EditOutlined />}
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </Paper>
    </Box>
  ) : (
    <div className={styles.test2}>
      <ClipLoader color="#000" size={150} />
    </div>
  );
}
