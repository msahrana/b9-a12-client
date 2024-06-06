import {createBrowserRouter} from "react-router-dom";
import Root from "../../layout/Root/Root";
import ErrorPage from "../../error/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Dashboard from "../../layout/Dashboard/Dashboard";
import AllUsers from "../../pages/Dashboard/Admin/AllUsers";
import Profile from "../../pages/Dashboard/Common/Profile";
import AllBloodDonationRequest from "../../pages/Dashboard/Admin/AllBloodDonationRequest";
import ContentManagement from "../../pages/Dashboard/Admin/ContentManagement";
import MyDonationRequests from "../../pages/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../../pages/Dashboard/Donor/CreateDonationRequest";
import UpdateDonationModal from "../../components/Modal/UpdateDonationModal";
import ContactForm from "../../components/Contact/ContactForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contactForm",
        element: <ContactForm></ContactForm>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      /* admin */
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest></AllBloodDonationRequest>,
      },
      {
        path: "content-management",
        element: <ContentManagement></ContentManagement>,
      },
      /* donor */
      {
        path: "my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "update-donation-modal/:id",
        element: <UpdateDonationModal></UpdateDonationModal>,
        loader: ({params}) =>
          fetch(`${import.meta.env.VITE_API_URL}/donation/${params.id}`),
      },
      /* common */
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
