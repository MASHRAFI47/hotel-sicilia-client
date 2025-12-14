import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Bookings from "../pages/Bookings/Bookings";
import Orders from "../pages/Orders/Orders";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import AddRoom from "../pages/Dashboard/Admin/AddRoom";
import BookingDetails from "../pages/Bookings/BookingDetails";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageRooms from "../pages/Dashboard/Admin/ManageRooms";
import UpdateRoom from "../pages/Dashboard/Admin/UpdateRoom";
import MyListings from "../pages/Dashboard/Admin/MyListings";
import Profile from "../pages/Dashboard/Common/Profile/Profile";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import GuestBookingDetails from "../pages/Dashboard/Guest/GuestBookingDetails";
import AddAppetite from "../pages/Dashboard/Admin/AddAppetite";
import OrderDetails from "../pages/Orders/OrderDetails";
import PendingOrders from "../pages/Dashboard/Admin/PendingOrders";
import ReservedRooms from "../pages/Dashboard/Admin/ReservedRooms";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: "Error 404",
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/bookings",
                element: <Bookings />,
            },
            {
                path: "/room/:paramId",
                element: <BookingDetails />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
            {
                path: "/order/:paramId",
                element: <OrderDetails />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    },

    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <PrivateRoute><Statistics /></PrivateRoute>
            },
            {
                path: "add-room",
                element: <PrivateRoute><AddRoom /></PrivateRoute>
            },
            {
                path: "manage-users",
                element: <PrivateRoute><ManageUsers /></PrivateRoute>
            },
            {
                path: "manage-rooms",
                element: <PrivateRoute><ManageRooms /></PrivateRoute>
            },
            {
                path: "update-room/:id",
                element: <PrivateRoute><UpdateRoom /></PrivateRoute>
            },
            {
                path: "my-listings",
                element: <PrivateRoute><MyListings /></PrivateRoute>
            },
            {
                path: "my-profile",
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: "my-bookings",
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            },
            {
                path: "guest-booking-details/:id",
                element: <PrivateRoute><GuestBookingDetails /></PrivateRoute>
            },
            {
                path: "add-appetite",
                element: <PrivateRoute><AddAppetite /></PrivateRoute>
            },
            {
                path: "pending-orders",
                element: <PrivateRoute><PendingOrders /></PrivateRoute>
            },
            {
                path: "reserved-rooms",
                element: <PrivateRoute><ReservedRooms /></PrivateRoute>
            },
        ]
    }
]);

export default router