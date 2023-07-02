import React from 'react';
import UserForm from "../../components/addUserForm/userform";

function AddPage() {
  const handleSubmit = (formData: any) => {
    fetch('http://localhost:8080/api/v1/users/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(formData);
        console.log(data);
        // Handle successful response
      })
      .catch(error => {
        console.log(formData);
        console.error(error);
        // Handle error
      });
  };

  return (
    <>
      <UserForm onSubmit={handleSubmit} />
    </>
  );
}

export default AddPage;



// import UserForm from "../../components/addUserForm/userform";
// import axios from 'axios';

// function AddPage() {
//    const handleSubmit = (formData: any) => {
//   axios.post('http://localhost:8080/api/v1/users/', formData)
  
//     .then(response => {
//       console.log(formData)
//       // Handle successful response
//       console.log(response.data);
//     })
//     .catch(error => {
//       // Handle error
//       console.log(formData)

//       console.error(error);
//     });
// };
//     return ( <>
//       <UserForm onSubmit={handleSubmit} />
//     </>);
// }

// export default AddPage;