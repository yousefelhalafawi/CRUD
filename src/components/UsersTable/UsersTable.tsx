import React, { useEffect, useState } from "react";
import { Table, Space, Dropdown, Menu, Input } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UsersTable = () => {
  const [users, setUsers] = useState<{ firstName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [pagination, searchText]);

  const fetchUsers = () => {
    setLoading(true);
    const { current, pageSize } = pagination;
    axios
      .get("http://localhost:8080/api/v1/users/", {
        params: {
          page: current,
          limit: pageSize,
        },
      })
      .then((response) => {
        setUsers(response.data.result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleActionClick = (userId: any, action: any) => {
    console.log("Action:", action, "User ID:", userId);
    if (action === "view") {
      navigate(`/viewUser/` + userId);
    } else if (action === "delete") {
      axios
        .delete(`http://localhost:8080/api/v1/users/${userId}`)
        .then((response) => {
          fetchUsers();
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else if (action === "edit") {
      navigate(`/user/` + userId);
    }
  };

  const renderActionsMenu = (userId: any) => (
    <Menu onClick={({ key }) => handleActionClick(userId, key)}>
      <Menu.Item key="view">
        <EyeOutlined /> View
      </Menu.Item>
      <Menu.Item key="edit">
        <EditOutlined /> Edit
      </Menu.Item>
      <Menu.Item key="delete">
        <DeleteOutlined /> Delete
      </Menu.Item>
    </Menu>
  );

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = searchText
    ? users.filter((user) =>
        user.firstName.toLowerCase().includes(searchText.toLowerCase())
      )
    : users;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <Space direction="horizontal">
          <span>{record.firstName + " "}</span>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Dropdown overlay={renderActionsMenu(record._id)}>
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      <Table
        dataSource={filteredUsers}
        columns={columns}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default UsersTable;
