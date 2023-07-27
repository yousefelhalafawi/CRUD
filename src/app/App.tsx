// App.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UsersPage from "../pages/users/allUsersPage";
import ErrorMe from "../components/error/error";
import AddPage from "../pages/addUser/addPage";
import EditUserPage from "../pages/EdituserPage/EditUserPage";
import styles from "./App.module.css";
import "./Scrollbar.css";
import MySidebar from "../components/mySidebar/mySidebar";
import ViewUser from "../pages/ViewUser/ViewUser";
import Search from "../pages/search/Search";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <MySidebar />

        <div style={{ flexGrow: 1 }} className={styles.all}>
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/user/:id" element={<EditUserPage />} />
            <Route path="/viewUser/:id" element={<ViewUser />} />
            <Route path="/search" element={<Search />} />

            <Route path="*" element={<ErrorMe />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
