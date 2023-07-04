import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import styles from "./UserForm.module.css";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  firstName: string;
  middleName: string;
  thirdName: string;
  email: string;
  ssn: number | null;
  birthDate: Date | null;
  address: string;
  gender: string;
  image: File | null;
}

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
      const date = new Date(value);
      setFormData((prevData) => ({ ...prevData, [name]: date }));
    } else if (name === "ssn") {
      const numberValue = parseInt(value, 10);
      setFormData((prevData) => ({ ...prevData, [name]: numberValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          inputProps={{ pattern: namePattern.source }}
          required
        />
        <TextField
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          inputProps={{ pattern: namePattern.source }}
          required
        />
        <TextField
          label="Third Name"
          name="thirdName"
          value={formData.thirdName}
          onChange={handleChange}
          inputProps={{ pattern: namePattern.source }}
          required
        />
      </div>
      <div className={styles.formRow}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="SSN"
          type="number" // Set the input type to "number"
          name="ssn"
          value={formData.ssn ? formData.ssn.toString() : ""} // Convert number to string
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <TextField
          type="date"
          name="birthDate"
          value={
            formData.birthDate
              ? formData.birthDate.toISOString().substr(0, 10)
              : ""
          } // Convert Date to string in "YYYY-MM-DD" format
          onChange={handleChange}
          required
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div>
          
          <FormControl>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={styles.formRow}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
