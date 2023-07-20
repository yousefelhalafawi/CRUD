import React, { useState } from "react";
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
  birthDate: string | null;
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
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else if (name === "ssn") {
      const numberValue = parseInt(value, 10);
      setFormData((prevData) => ({ ...prevData, [name]: numberValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Create a new handleSelectChange function to handle SelectChangeEvent<string>
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit} className={styles.all}>
            <h2 className="text-center">Add User</h2>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  pattern={namePattern.source}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="middleName" className="form-label">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  pattern={namePattern.source}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="thirdName" className="form-label">
                  Third Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="thirdName"
                  name="thirdName"
                  value={formData.thirdName}
                  onChange={handleChange}
                  pattern={namePattern.source}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ssn" className="form-label">
                SSN
              </label>
              <input
                type="number"
                className="form-control"
                id="ssn"
                name="ssn"
                value={formData.ssn ? formData.ssn.toString() : ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="birthDate" className="form-label">
                  Birth Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={formData.gender || "male"}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
