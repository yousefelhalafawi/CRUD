import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Avatar,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  firstName: string;
  middleName: string;
  thirdName: string;
  email: string;
  ssn: number | null;
  birthDate: string | null;
  address: string;
  gender: string;
  image: File | null;
}

const defaultTheme = createTheme();

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    thirdName: "",
    email: "",
    ssn: null,
    birthDate: null,
    address: "",
    gender: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "birthDate") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else if (name === "ssn") {
      const numberValue = parseInt(value, 10);
      setFormData((prevData) => ({ ...prevData, [name]: numberValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Create a new handleSelectChange function to handle SelectChangeEvent<string>
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const namePattern = /^[A-Za-z]+$/;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  inputProps={{ pattern: namePattern.source }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  name="middleName"
                  autoComplete="additional-name"
                  value={formData.middleName}
                  onChange={handleChange}
                  inputProps={{ pattern: namePattern.source }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="thirdName"
                  label="Third Name"
                  name="thirdName"
                  autoComplete="additional-name"
                  value={formData.thirdName}
                  onChange={handleChange}
                  inputProps={{ pattern: namePattern.source }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ssn"
                  label="SSN"
                  name="ssn"
                  type="number"
                  value={formData.ssn ? formData.ssn.toString() : ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Birth Date</InputLabel>
                <TextField
                  type="date"
                  name="birthDate"
                  // label="Birth Date"
                  value={formData.birthDate || ""}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender || "male"}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserForm;
