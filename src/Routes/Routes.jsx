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
import ForumDetails from "../Pages/ForumDetails/ForumDetails";
import AdminRoute from "./AdminRoute";
import AllSubscribers from "../Pages/AdminPages/AllSubscribers/AllSubscribers";
import AllTrainers from "../Pages/AdminPages/AllTrainers/AllTrainers";
import AppliedTrainer from "../Pages/AdminPages/AppliedTrainer/AppliedTrainer";
import Profile from "../Pages/Profile/Profile";
import Balance from "../Pages/AdminPages/Balance/Balance";
import ManageSlots from "../TrainerPages/ManageSlots/ManageSlots";

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
        path: "/forum/details/:id",
        element: <ForumDetails />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
      // Admin Routes
      {
        path: "/all-subscribers",
        element: (
          <AdminRoute>
            <AllSubscribers />
          </AdminRoute>
        ),
      },
      {
        path: "/all-trainers",
        element: (
          <AdminRoute>
            <AllTrainers />
          </AdminRoute>
        ),
      },
      {
        path: "/applied-trainers",
        element: (
          <AdminRoute>
            <AppliedTrainer />
          </AdminRoute>
        ),
      },
      {
        path: "/balance",
        element: (
          <AdminRoute>
            <Balance />
          </AdminRoute>
        ),
      },
      {
        path: "/add-forum/admin",
        element: (
          <AdminRoute>
            <AddNewForum />
          </AdminRoute>
        ),
      },

      // Trainer routes
      {
        path: "/manage-slots",
        element: (
          <TrainerRoute>
            <ManageSlots />
          </TrainerRoute>
        ),
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
