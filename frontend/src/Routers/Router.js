import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Carts from "../Pages/Carts/Carts";
import Orders from "../Pages/Orders/Orders";
import ReviewsComponent from "../Pages/UserDashboard/Reviews/Reviews";
import UserSettings from "../Pages/UserSettings/UserSettings";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import DriverDashboard from "../Pages/DriverDashboard/DriverDashboard";
import Login from "../Pages/Login/Login";
import OwnerLogin from "../Pages/OwnerLogin/OwnerLogin";
import OwnerRegister from "../Pages/OwnerRegister/OwnerRegister";
import Products from "../Pages/AddProducts/AddProducts";
import Register from "../Pages/Register/Register";
import ShopOwnerDashboard from "../Pages/ShopOwnerDashboard/ShopOwnerDashboard";
import ShopOwnerSettings from "../Pages/ShopOwnerSettings/ShopOwnerSettings";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";
import { useSelector } from "react-redux";
import Shops from "../Pages/UserDashboard/Shops/Shops";
import ProductsShops from "../Pages/UserDashboard/Products/ProductsShops";
import Category from "../Pages/UserDashboard/Category/Category";
import Chat from "../Pages/Chat/Chat";
const ProtectedRoute = ({ element, requiredRole }) => {
  const { isLoggedIn, roleId } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }


  return element;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/owner-register",
    element: <OwnerRegister />,
  },
  {
    path: "/owner-login",
    element: <OwnerLogin />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        path: "carts", 
        element: <ProtectedRoute element={<Carts />} /> 
      },
      { 
        path: "orders", 
        element: <ProtectedRoute element={<Orders />} /> 
      },
      {
        path: "user-dashboard",
        element: <UserDashboard />,
        children: [
          {
            path: "",
            element: <Category />,
          },
          {
            path: ":categoryName",
            element: <Shops />,
          },
          {
            path: ":categoryName/:shopName",
            element: <ProductsShops />,
          },
          {
            path: ":categoryName/:shopName/:productId",
            element: <ProductsShops />,  // <-- Ensure ProductsShops is rendered
          },
        ],
      },
      {
        path: "user-settings",
        element: <ProtectedRoute element={<UserSettings />} />,
      },
      {
        path: "admin-dashboard",
        element: <ProtectedRoute element={<AdminDashboard />} requiredRole={1} />,
      },
      {
        path: "driver-dashboard",
        element: <ProtectedRoute element={<DriverDashboard />} requiredRole={2} />,
      },
      {
        path: "Chat",
        element: <ProtectedRoute element={<Chat/>} />,
      },
      { 
        path: "products", 
        element: <ProtectedRoute element={<Products />} requiredRole={3} /> 
      },
      { 
        path: "shop-owner-dashboard", 
        element: <ProtectedRoute element={<ShopOwnerDashboard />} requiredRole={3} /> 
      },
      { 
        path: "shop-owner-settings", 
        element: <ProtectedRoute element={<ShopOwnerSettings />} requiredRole={3} /> 
      },
      { 
        path: "*", 
        element: <Navigate to="/user-dashboard" replace /> 
      },
    ],
  },
]);

