// App.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UsersPage from "../pages/users/allUsersPage";
import ErrorMe from "../components/error/error";
import AddPage from "../pages/addUser/addPage";
import UserPage from "../pages/userPage/userPage";
import styles from "./App.module.css";
import {
  toggleNavigationFasle,
  toggleNavigationTrue,
} from "../state/navigationSlice";
import "./Scrollbar.css";
import Sidebar from "../components/Sidebar/Sidebar";
const App: React.FC = () => {
  // const { data } = useFetchData("https://fakestoreapi.com/products");
  // console.log(data);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/deleted-users" element={<UserPage />} />

            <Route path="*" element={<ErrorMe />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
