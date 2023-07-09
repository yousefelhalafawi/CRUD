import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../../components/userCard/user";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Container } from "@mui/material";
import Badge from "react-bootstrap/Badge";
import styles from "./UsersPage.module.css";
import { useNavigate } from "react-router-dom";
import { toggleNavigationFasle } from "../../state/navigationSlice";
import { useDispatch } from "react-redux";
import { ClassNames } from "@emotion/react";
import UsersTable from "../../components/test/test";
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
  const navigate = useNavigate();

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

  const deleteUser = (userId: string) => {
    axios
      .delete(`http://localhost:8080/api/v1/users/${userId}`)
      .then((response) => {
        console.log("User deleted successfully");
        toast.success("User deleted successfully");

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  const dispatch = useDispatch();
  const handleToggleNavigationFalse = () => {
    dispatch(toggleNavigationFasle());
  };
  return (
    <>
      {loading ? (
        <div className={styles.container}>
          <ClipLoader color="#000" size={150} />
        </div>
      ) : (
        <>
          <h1 className={styles.container}>Users</h1>
          {users.length > 0 ? (
            <Container className={styles.all}>
              <UsersTable />
            </Container>
          ) : (
            <div className={styles.container}>NO USERS YET</div>
          )}
        </>
      )}
    </>
  );
}

export default UsersPage;
{
  /* <Grid container spacing={4}>
                {users.map((user) => (
                  <Grid key={user._id} item xs={6} md={4} lg={3}>
                    <UserCard
                      id={user._id}
                      onClick={() => {
                        navigate(`/user/${user._id}`);
                        handleToggleNavigationFalse();
                      }}
                      title={user.firstName + " " + user.thirdName}
                      imageSrc={user.image}
                      onDelete={() => deleteUser(user._id)}
                      ssn={user.ssn}
                    />
                  </Grid>
                ))}
              </Grid> */
}
