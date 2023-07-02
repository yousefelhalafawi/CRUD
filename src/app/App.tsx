// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from '../components/nav-bar/navbar';
import UsersPage from '../pages/users/allUsersPage';
import ErrorMe from '../components/error';
import AddPage from '../pages/addUser/addPage';
import UserPage from '../pages/userPage/userPage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<UsersPage/>} />
        <Route path="/add" element={<AddPage/>} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<ErrorMe/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



// import React from 'react';
// import './App.css';
// import UsersPage from '../pages/users/allUsersPage';
// import Navbar from '../components/nav-bar/navbar';

// function App() {
//   return (
//     <>
//     <Navbar/>
//     <UsersPage/>
//     </>
//   );
// }

// export default App;
