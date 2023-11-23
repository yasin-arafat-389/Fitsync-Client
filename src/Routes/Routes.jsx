import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import Payment from "../Components/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <div>Contact</div>,
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Registration />,
      },
    ],
  },

  // Dashboard routes
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <div>This is home</div>
          </PrivateRoute>
        ),
      },
      {
        path: "/e-commerce",
        element: (
          <PrivateRoute>
            <div>This is e-commerce</div>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <div>This is admin</div>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
