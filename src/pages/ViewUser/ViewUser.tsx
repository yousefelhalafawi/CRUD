import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useGetRequest from "../../hooks/useFetchData";
import styles from "./ViewUser.module.css";

interface AttributeOption {
  label: string;
  control: string;
  controlType: string;
  placeholder?: string;
  validation?: {
    [key: string]: string | boolean;
  };
  values?: string[];
}

interface Attribute {
  name: string;
  type: string;
  options?: AttributeOption;
}

interface OptionsResponse {
  message: string;
  result: {
    attributes: Attribute[];
  };
}

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
  [key: string]: string | number; // Index signature for additional properties
}

const ViewUser: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [options, setOptions] = useState<Attribute[]>([]);
  const navigate = useNavigate();
  const { fetchedData, loading, error } = useGetRequest(
    "http://example.com/api/data"
  );

  useEffect(() => {
    fetchUser();
    fetchOptions();
  }, []);

  const handleEditClick = () => {
    navigate(`/user/` + user?._id);
  };

  const fetchUser = () => {
    axios
      .get("http://localhost:8080/api/v1/users/" + id)
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get<OptionsResponse>(
        "http://localhost:8080/api/v1/users/options"
      );
      const attributes = response.data.result.attributes;
      setOptions(attributes);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const renderFormFields = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    const rows: JSX.Element[] = [];
    options.forEach((attribute) => {
      const { name, type, options: attributeOptions } = attribute;
      const { label, controlType, values } = attributeOptions || {};

      // If the attribute has values, render it as a label-value pair
      if (values && user && user[name]) {
        rows.push(
          <Grid item xs={12} sm={4} key={name}>
            <Typography variant="body1">
              <strong>{label}:</strong> {user[name]}
            </Typography>
          </Grid>
        );
      } else if (
        name === "firstName" ||
        name === "middleName" ||
        name === "thirdName"
      ) {
        rows.push(
          <Grid item xs={12} sm={4} key={name}>
            <Typography variant="body1">
              <strong>{label}:</strong> {user ? user[name] : ""}
            </Typography>
          </Grid>
        );
      } else if (name === "birthDate") {
        const formattedDate = user
          ? new Date(user[name]).toLocaleDateString()
          : "";
        rows.push(
          <Grid item xs={12} sm={4} key={name}>
            <Typography variant="body1">
              <strong>{label}:</strong> {formattedDate}
            </Typography>
          </Grid>
        );
      }
    });
    return rows;
  };

  return user ? (
    <Box className={styles.container}>
      <Paper className={styles.paper}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6">User Details</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <img src={user.image} alt="User" className={styles.img} />
          </Grid>
          {renderFormFields()}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Address:</strong> {user.address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>SSN:</strong> {user.ssn}
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="primary"
          className={styles.btn}
          icon={<EditOutlined />}
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </Paper>
    </Box>
  ) : (
    <div className={styles.test2}>
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default ViewUser;
