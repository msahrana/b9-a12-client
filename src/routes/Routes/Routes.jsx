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
import DonorDashboard from "../../pages/Dashboard/Donor/DonorDashboard";
import AddBlog from "../../pages/Blog/AddBlog";
import UserDashboard from "../../pages/Dashboard/Common/UserDashboard";
import Funding from "../../pages/Funding/Funding";
import Payment from "../../pages/Funding/Payment";
import BlogModal from "../../components/Modal/BlogModal";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DonationRequests from "../../pages/DonationRequests/DonationRequests";
import BloodDonationRequestDetails from "../../pages/DonationRequests/BloodDonationRequestDetails";
import SearchPage from "../../components/Search/SearchPage";

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
      {
        path: "/add-blog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:price",
        element: <Payment></Payment>,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "/bloodDonationRequestDetails/:id",
        element: (
          <PrivateRoute>
            <BloodDonationRequestDetails></BloodDonationRequestDetails>
          </PrivateRoute>
        ),
        loader: ({params}) =>
          fetch(`${import.meta.env.VITE_API_URL}/donation/${params.id}`),
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>,
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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      /* admin */
      {
        path: "/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
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
        path: "donor-dashboard",
        element: <DonorDashboard></DonorDashboard>,
      },
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
      {
        path: "blog-modal/:id",
        element: <BlogModal></BlogModal>,
        loader: ({params}) =>
          fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`),
      },
      /* volunteer */
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest></AllBloodDonationRequest>,
      },
      /* common */
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog></AddBlog>,
      },
    ],
  },
]);
