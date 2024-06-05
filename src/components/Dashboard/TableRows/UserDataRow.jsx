import PropTypes from "prop-types";
import {useState} from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";

const UserDataRow = ({user: userData, refetch}) => {
  const {user: loggedInUser} = useAuth();
  const [isStatus, setIsStatus] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {user} = userData;
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

  const handleStatus = () => {
    setIsStatus(false);
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
        <button onClick={() => handleStatus(true)}>
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
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
