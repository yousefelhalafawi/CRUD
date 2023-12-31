import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../../components/addUserForm/userform";

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
        console.log(data)
        if (data.message === "user added") {
          // Show a success toast notification
          toast.success("User added successfully");

          // Navigate to "/"
          navigate("/");
        } else {
          // Show an error toast notification
          toast.error("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <UserForm onSubmit={handleSubmit} />
    </>
  );
}

export default AddPage;
