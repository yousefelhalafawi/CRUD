import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserPage.module.css";
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const middleNameRef = useRef<HTMLInputElement | null>(null);
  const thirdNameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    console.log("erewrew");
    axios
      .get("http://localhost:8080/api/v1/users/" + id)
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const updatedData = {
      firstName: firstNameRef.current?.value || "",
      middleName: middleNameRef.current?.value || "",
      thirdName: thirdNameRef.current?.value || "",
      address: addressRef.current?.value || "",
    };

    axios
      .patch("http://localhost:8080/api/v1/users/" + id, updatedData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return user ? (
    <>
      <Container>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "2%",
          }}
        >
          <Image src={user.image} roundedCircle className={styles.userImage} />
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "480px",
              cursor: "pointer",
              color: "#fff",
              backgroundColor: "#ED6E3E",
              borderRadius: "20%",
              padding: "5px",
            }}
          >
            <FontAwesomeIcon icon={faPen} onClick={handleEdit} />
          </div>
        </div>
      </Container>

      <Container className={styles.form}>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <TextField
                label="First Name"
                defaultValue={user.firstName}
                fullWidth
                inputRef={firstNameRef}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Middle Name"
                defaultValue={user.middleName}
                fullWidth
                inputRef={middleNameRef}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Third Name"
                defaultValue={user.thirdName}
                fullWidth
                inputRef={thirdNameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                defaultValue={user.email}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                defaultValue={user.address}
                fullWidth
                inputRef={addressRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="SSN"
                defaultValue={user.ssn}
                fullWidth
                disabled
              />
            </Grid>
            {true && (
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </>
  ) : (
    <>loading....</>
  );
};

export default UserPage;
