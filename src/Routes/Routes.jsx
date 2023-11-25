import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../Pages/Home/Home";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gallery",
        element: <div>Gallery</div>,
      },
      {
        path: "/trainer",
        element: <div>Trainer</div>,
      },
      {
        path: "/classes",
        element: <div>Classes</div>,
      },
      {
        path: "/community",
        element: <div>Community</div>,
      },
      {
        path: "/profile",
        element: <div>This is Profile</div>,
      },
      {
        path: "/blog/details/:id",
        element: <BlogDetails />,
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
        element: <div>This is dash home</div>,
      },
    ],
  },
]);

export default router;
