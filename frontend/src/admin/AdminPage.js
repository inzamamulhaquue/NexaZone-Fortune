import React from "react";
import { Link } from "react-router-dom";


const AdminPage = () => (
  <div style={{ padding: 20 }}>
    <h1>Admin Panel</h1>
    <ul>
      <li><Link to="/admin/about">About Section</Link></li>
      <li><Link to="/admin/header">Header Section</Link></li>
      <li><Link to="/admin/topbar">TopBar Section</Link></li>
      <li><Link to="/admin/facts">Manage Facts</Link></li>
      <li><Link to="/admin/whyus">Why Us Section</Link></li>
      <li><Link to="/admin/users">View Users</Link></li>
    </ul>
  </div>
);


export default AdminPage;