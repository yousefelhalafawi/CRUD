import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserPage.module.css";
import { ClipLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";

//custom hooks
import usePatchRequest from "../../hooks/usePatchRequest";
import useGetRequest from "../../hooks/useFetchData";

const UserPage = () => {
  const { id } = useParams();
  const { patchData } = usePatchRequest(
    "http://localhost:8080/api/v1/users/" + id
  );

  const navigate = useNavigate();
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
  const [effect, setEffect] = useState(true);

  const [user, setUser] = useState<User | null>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const thirdNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const subref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUser();
  }, [effect]);

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

  const handleSave = () => {
    const updatedData = {
      firstName: firstNameRef.current?.value || "",
      middleName: middleNameRef.current?.value || "",
      thirdName: thirdNameRef.current?.value || "",
      address: addressRef.current?.value || "",
      email: user?.email,
      birthDate: user?.birthDate,
      gender: user?.gender,
      ssn: user?.ssn,
    };

    patchData(updatedData)
      .then(() => {
        toast.success("User Updated successfully");
        navigate(`/viewUser/` + user?._id);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed");
      });
  };
  const handleCancel = () => {
    navigate(1);
  };

  const handleUpdate = () => {
    if (
      fileRef.current &&
      fileRef.current.files &&
      fileRef.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("image", fileRef.current.files[0]);

      const updatedData = {
        // Add other fields to the updatedData object if needed
      };

      formData.append("data", JSON.stringify(updatedData));
      axios
        .patch("http://localhost:8080/api/v1/users/img-upload/" + id, formData)
        .then((response) => {
          toast.success("image Updated successfully");
          setEffect(!effect);
        })
        .catch((error) => {
          toast.error("Failed");
        });
    } else {
    }
  };

  return user ? (
    <div className={styles.all2}>
      <Container>
        <div className={styles.parent}>
          <Image src={user.image} roundedCircle className={styles.userImage} />

          <div className={styles.child}>
            <form>
              <input
                type="file"
                hidden
                name="image"
                className="btn m-0"
                ref={fileRef}
                onChange={() => {
                  subref.current?.click();
                  console.log("3333333333333");
                  handleUpdate();
                }}
              />
              <input type="submit" hidden className="btn m-0" ref={subref} />

              <FontAwesomeIcon
                icon={faPen}
                onClick={() => {
                  console.log("111111111111111");
                  fileRef.current?.click();
                }}
              />
            </form>
          </div>
        </div>
      </Container>

      <Container className={styles.form}>
        <div className={styles.all}>
          <div className="row g-2">
            <div className="col-lg-4 col-12">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                defaultValue={user.firstName}
                ref={firstNameRef}
                placeholder="First Name"
              />
            </div>
            <div className="col-lg-4 col-12">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                className="form-control"
                defaultValue={user.middleName}
                ref={middleNameRef}
                placeholder="Middle Name"
              />
            </div>
            <div className="col-lg-4 col-12">
              <label htmlFor="thirdName">Third Name</label>
              <input
                type="text"
                id="thirdName"
                className="form-control"
                defaultValue={user.thirdName}
                ref={thirdNameRef}
                placeholder="Third Name"
              />
            </div>
            <div className="col-lg-6 col-12">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                defaultValue={user.email}
                disabled
                placeholder="Email"
              />
            </div>
            <div className="col-lg-6 col-12">
              <label htmlFor="ssn">SSN</label>
              <input
                type="text"
                id="ssn"
                className="form-control"
                defaultValue={user.ssn.toString()}
                disabled
                placeholder="SSN"
              />
            </div>
            <div className="col-12">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                defaultValue={user.address}
                ref={addressRef}
                placeholder="Address"
              />
            </div>

            <div className="col-12 mb-5 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary w-50"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger ms-1 w-auto"
                onClick={handleCancel}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className={styles.test2}>
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default UserPage;
