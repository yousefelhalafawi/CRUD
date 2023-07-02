import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


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

function UserPage() {
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get('http://localhost:8080/api/v1/users/' + id)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedUser(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...(prevState as User),
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setEditedUser(prevState => ({
      ...(prevState as User),
      birthDate: date ? date.toISOString() : '',
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditedUser(prevState => ({
      ...(prevState as User),
      gender: value,
    }));
  };

  const handleSave = () => {
    if (editedUser) {
      const { firstName, middleName, thirdName, email, address, birthDate, gender, ssn } = editedUser;
      
      if (
        firstName.trim() === '' ||
        middleName.trim() === '' ||
        thirdName.trim() === '' ||
        email.trim() === '' ||
        address.trim() === '' ||
        birthDate.trim() === '' ||
        gender.trim() === '' ||
        ssn === null
      ) {
        console.error('Please fill in all fields');
        return;
      }
  
      axios
        .patch(`http://localhost:8080/api/v1/users/editUser/${id}`, editedUser)
        .then(response => {
          setUser(editedUser);
          setEditing(false);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }
  };
  

  if (user) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <img src={user.image} alt="User" style={{ width: '100%', height: 'auto' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            {editing ? (
              <>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={editedUser!.firstName}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="middleName"
                  label="Middle Name"
                  value={editedUser!.middleName}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="thirdName"
                  label="Third Name"
                  value={editedUser!.thirdName}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="email"
                  label="Email"
                  value={editedUser!.email}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="address"
                  label="Address"
                  value={editedUser!.address}
                  onChange={handleInputChange}
                  fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Birth Date"
                    value={editedUser!.birthDate ? new Date(editedUser!.birthDate) : null}
                    onChange={handleDateChange}
                    renderInput={(params:any) => <TextField {...params} />}
                    fullWidth
                  />
                </LocalizationProvider>
                <RadioGroup
                  aria-label="Gender"
                  name="gender"
                  value={editedUser!.gender}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
                <TextField
                  name="ssn"
                  label="SSN"
                  value={editedUser!.ssn}
                  onChange={handleInputChange}
                  fullWidth
                />
                <Button variant="contained" onClick={handleSave}>Save</Button>
              </>
            ) : (
              <>
                <Typography variant="h6">Name: {user.firstName} {user.middleName} {user.thirdName}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
                <Typography variant="body1">Address: {user.address}</Typography>
                <Typography variant="body1">Birth Date: {formatDate(user.birthDate)}</Typography>
                <Typography variant="body1">Gender: {user.gender}</Typography>
                <Typography variant="body1">SSN: {user.ssn}</Typography>
                <Button variant="contained" onClick={handleEdit}>Edit</Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default UserPage;
