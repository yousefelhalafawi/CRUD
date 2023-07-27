import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import styles from "./UsersPage.module.css";
import UsersTable from "../../components/UsersTable/UsersTable";
import { User } from "../../interfaces/interfaces";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${BASE_URL}/users/`)
      .then((response) => {
        setUsers(response.data.result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className={styles.test2}>
          <ClipLoader color="#000" size={150} />
        </div>
      ) : (
        <div className={styles.test}>
          <h1 className={styles.container}>Users</h1>
          {users.length > 0 ? ( //check users lenght
            <Container className={styles.all}>
              <UsersTable />
            </Container>
          ) : (
            <div className={styles.container}>NO USERS YET</div>
          )}
        </div>
      )}
    </>
  );
}

export default UsersPage;
