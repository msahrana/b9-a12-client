import PropTypes from "prop-types";
import {useState} from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import UpdateStatusModal from "../../Modal/UpdateStatusModal";

const UserDataRow = ({user: userData, refetch, handleStatus}) => {
  const {user: loggedInUser} = useAuth();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {user} = userData;

  /* role update */
  const {mutateAsync} = useMutation({
    mutationFn: async (role) => {
      const {data} = await axiosSecure.put(`/users/update/${userData?.email}`, {
        role: role.role,
        status: userData.user.status,
      });
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success("User role updated successfully!");
      setIsOpen(false);
    },
  });
  //   modal handler
  const modalHandler = async (selected) => {
    if (loggedInUser.email === user.email) {
      toast.error("Action Not Allowed");
      return setIsOpen(false);
    }
    const userRole = {
      role: selected,
      status: "active",
    };
    try {
      await mutateAsync(userRole);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  /* status update */
  const {mutate} = useMutation({
    mutationFn: (status) => {
      const {data} = axiosSecure.put(`/users/status/${userData?.email}`, {
        role: userData.user.role,
        status: status.status,
      });
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success("User role updated successfully!");
      setOpen(false);
    },
  });
  //   modal handler
  const modalHandler2 = async (selected) => {
    const userStatus = {
      status: selected,
    };
    try {
      mutate(userStatus);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img className="w-10 rounded-full" src={userData?.image_url} alt="" />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{userData?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{userData?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {userData?.user?.role}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button onClick={() => handleStatus(userData)}>
          {userData?.user?.status ? (
            <p
              className={`${
                userData.user.status === "active"
                  ? "text-green-500"
                  : "text-red-500"
              } whitespace-no-wrap`}
            >
              {userData.user.status}
            </p>
          ) : (
            <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
          )}
        </button>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User role Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={userData}
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Status</span>
        </button>
        <UpdateStatusModal
          open={open}
          setOpen={setOpen}
          modalHandler2={modalHandler2}
          user={userData}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
