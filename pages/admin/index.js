import { useState, useEffect } from "react";
import axios from "axios";
import AdminRoute from "../../components/routes/AdminRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminIndex = () => {
  useEffect(() => {
    }, []);

  
  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <AdminRoute>
      <h1 className="jumbotron text-center square">Admin Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
    </AdminRoute>
  );
};

export default AdminIndex;