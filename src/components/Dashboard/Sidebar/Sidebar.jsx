import {GrLogout} from "react-icons/gr";
import {FcSettings} from "react-icons/fc";
import {Link} from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import logo from "/images/logo.png";
import useRole from "../../../hooks/useRole/useRole";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import DonorMenu from "./Menu/DonorMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import {MdDashboardCustomize} from "react-icons/md";

const Sidebar = () => {
  const {logOut} = useAuth();
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-200 w-80 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 bg-slate-400 shadow-lg rounded-lg justify-center items-center mx-auto">
              <Link to="/">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Dashboard */}
              <MenuItem
                label="UserDashboard"
                address="/dashboard"
                icon={MdDashboardCustomize}
              />

              {role === "donor" && <DonorMenu />}
              {role === "volunteer" && <VolunteerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem
            label="Profile"
            address="/dashboard/profile"
            icon={FcSettings}
          />

          {/* logout */}
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
