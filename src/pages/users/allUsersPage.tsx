import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import styles from "./UsersPage.module.css";

import UsersTable from "../../components/UsersTable/UsersTable";
interface User {
  _id: string;
  firstName: string;
  middleName: string;
  thirdName: string;
  ssn: number;
  image: string;
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/v1/users/")
      .then((response) => {
        setUsers(response.data.result.data);
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
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
          {users.length > 0 ? (
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
