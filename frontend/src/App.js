import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Category, PageNotFound } from "./pages";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserDashboard from "./pages/User/Dashboard";
import Private from "./components/Routes/Private";
import ResetPassword from "./pages/Auth/ResetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import Dashboard from "./pages/Admin/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/category" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
