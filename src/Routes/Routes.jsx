import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import DashboardLayout from "../Layouts/DashboardLayout";
import Home from "../Pages/Home/Home";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import Gallery from "../Pages/Gallery/Gallery";
import Trainer from "../Pages/Trainer/Trainer";
import BeATrainer from "../Pages/BeATrainer/BeATrainer";
import PrivateRoute from "./PrivateRoute";
import TrainerDetails from "../Pages/TrainerDetails/TrainerDetails";
import Pricing from "../Pages/Pricing/Pricing";
import AddNewClass from "../TrainerPages/AddNewClass/AddNewClass";
import TrainerRoute from "./TrainerRoute";
import Classes from "../Pages/Classes/Classes";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import Forum from "../Pages/Forum/Forum";
import AddNewForum from "../TrainerPages/AddNewForum/AddNewForum";

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
        element: <Gallery />,
      },
      {
        path: "/trainer",
        element: <Trainer />,
      },
      {
        path: "/become-trainer",
        element: (
          <PrivateRoute>
            <BeATrainer />
          </PrivateRoute>
        ),
      },
      {
        path: "/trainer/details/:id",
        element: (
          <PrivateRoute>
            <TrainerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/pricing",
        element: (
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        ),
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/class/details/:id",
        element: <ClassDetails />,
      },
      {
        path: "/community",
        element: <Forum />,
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

      // Admin Routes
      {
        path: "/all-subscribers",
        element: <div>This is All sub</div>,
      },
      {
        path: "/all-trainers",
        element: <div>This is All trainers</div>,
      },
      {
        path: "/applied-trainers",
        element: <div>This is applied trainers</div>,
      },
      {
        path: "/balance",
        element: <div>This is Balance</div>,
      },
      {
        path: "/add-forum/admin",
        element: <AddNewForum />,
      },

      // Trainer routes
      {
        path: "/manage-slots",
        element: <div>This is manage slots</div>,
      },
      {
        path: "/manage-members",
        element: <div>This is manage members</div>,
      },
      {
        path: "/add-forum/trainer",
        element: <AddNewForum />,
      },
      {
        path: "/add-class",
        element: (
          <TrainerRoute>
            <AddNewClass />,
          </TrainerRoute>
        ),
      },

      // Member route
      {
        path: "/activity-log",
        element: <div>This is activity</div>,
      },
      {
        path: "/profile-settings",
        element: <div>This is profile settings</div>,
      },
      {
        path: "/recommended-classes",
        element: <div>This is reco</div>,
      },
    ],
  },
]);

export default router;
