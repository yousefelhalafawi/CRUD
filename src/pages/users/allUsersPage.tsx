import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../../components/userCard/user';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface User {
  _id: string;
  firstName: string;
  middleName: string;
  thirdName: string;
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
      .get('http://localhost:8080/api/v1/users/list')
      .then(response => {
        setUsers(response.data);
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  const deleteUser = (userId: string) => {
    axios
      .delete(`http://localhost:8080/api/v1/users/deleteUser/${userId}`)
      .then(response => {
        console.log('User deleted successfully');
        toast.success("User deleted successfully");

        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ClipLoader color="#000" size={150} /> {/* Render the spinner while loading */}
        </div>     
      ) : (
        (users.length > 0) ? (
          users.map(user => (
            <UserCard
              key={user._id}
              id={user._id}
              onClick={() => {
                console.log('11111');
              }}
              title={user.firstName + ' ' + user.thirdName}
              imageSrc={user.image}
              onDelete={() => deleteUser(user._id)}
            />
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           NO USERS YET 
          </div>
        ) 
      )}
    </>
  );
  
}

export default UsersPage;
