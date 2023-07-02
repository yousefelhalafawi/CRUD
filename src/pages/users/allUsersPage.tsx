import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../../components/user/user';

interface User {
  _id: string;
  firstName: string;
  middleName: string;
  thirdName: string;
  image: string;
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/v1/users/list')
      .then(response => {
        setUsers(response.data); // Set the fetched data to the users state
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteUser = (userId: string) => {
    axios.delete(`http://localhost:8080/api/v1/users/deleteUser/${userId}`)
      .then(response => {
        console.log('User deleted successfully');
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <>
      {users.map(user => (
        <UserCard
          key={user._id}
          id={user._id}
          onClick={() => { console.log('11111') }}
          title={user.firstName + ' ' + user.thirdName}
          imageSrc={user.image}
          onDelete={() => deleteUser(user._id)} 
        />
      ))}
    </>
  );
}

export default UsersPage;
