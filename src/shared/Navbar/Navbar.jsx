import {Link} from "react-router-dom";
import logo from "/images/logo1.png";
import useAuth from "../../hooks/useAuth/useAuth";

const Navbar = () => {
  const {user, logOut} = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <Link to="/">
            <img className="w-auto h-20" src={logo} alt="" />
          </Link>
          <span className="font-bold text-2xl">JobNest</span>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allJobs">All Jobs</Link>
          </li>
          <li className="hidden lg:flex">
            <Link to="/contact">Contact</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/addJobs">Add A Job</Link>
              </li>
              <li>
                <Link to="/appliedJobs">Applied Jobs</Link>
              </li>
              <li>
                <Link to="/myJobs">My Jobs</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* theme */}
        {/* <label className="cursor-pointer lg:grid place-items-center hidden">
          <input
            onChange={handleToggleTheme}
            type="checkbox"
            value="dark"
            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
          />
          <svg
            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label> */}
      </div>
    </div>
  );
};

export default Navbar;
