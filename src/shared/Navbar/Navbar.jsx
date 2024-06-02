import {Link} from "react-router-dom";
import logo from "/images/logo.png";
import useAuth from "../../hooks/useAuth/useAuth";

const Navbar = () => {
  const {user, logOut} = useAuth();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link>
          <img className="w-40" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/donation-requests">Donation Requests</Link>
            </li>
            <li className="hidden lg:flex">
              <Link to="/funding">Funding</Link>
            </li>
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        {user && (
          <div className="dropdown dropdown-end">
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
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
      </div>
    </div>
  );
};

export default Navbar;
