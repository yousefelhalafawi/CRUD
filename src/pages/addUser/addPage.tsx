import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../../components/addUserForm/userform";
import styles from "./AddPage.module.css";
function AddPage() {
  const navigate = useNavigate();

  const handleSubmit = (formData: any) => {
    const form_data = new FormData();
    Object.keys(formData).forEach((key) => {
      form_data.append(key, formData[key]);
    });

    fetch("http://localhost:8080/api/v1/users/", {
      method: "POST",
      body: form_data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          // Show a success toast notification
          toast.success("User added successfully");
          console.log(form_data);

          // Navigate to "/"
          navigate("/");
        } else {
          toast.error("Error: " + data.message);
          console.log(form_data);
          console.log(formData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.all}>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddPage;
