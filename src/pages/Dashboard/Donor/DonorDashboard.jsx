import {Link, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import {useMutation, useQuery} from "@tanstack/react-query";
import DeleteModal from "../../../components/Modal/DeleteModal";
import {useState} from "react";
import toast from "react-hot-toast";
import UpdateDashboardModal from "../../../components/Modal/UpdateDashboardModal";

const DonorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {user, loading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const _id = useParams();
  console.log(_id);

  const closeModal = () => {
    setIsOpen(false);
  };

  const {data: donations = [], refetch} = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      if (user?.email) {
        const {data} = await axiosSecure.get(`/donations`);
        return data;
      }
    },
  });

  const {mutateAsync} = useMutation({
    mutationFn: async (_id) => {
      const {data} = await axiosSecure.delete(`/donation/${_id}`);
      return data;
    },
    onSuccess: async (data) => {
      console.log(data);
      refetch();
      toast.success("Blood Donation Deleted");
    },
  });

  //  Handle Delete
  const deleteDonation = async (id) => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = (donation) => {
    axiosSecure.patch(`/donation/status/${donation._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        // const data = blogs.find((item) => item === blog);
        // setBlogs(data);
        toast.success("Donation Status Updated!");
      }
    });
  };

  /* status update */
  const {mutate} = useMutation({
    mutationFn: (status) => {
      const {data} = axiosSecure.patch(`/our-donation/${status._id}`, {
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
  const modalHandler = async (selected) => {
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

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div className="md:ml-16">
      <h1 className="text-4xl font-semibold mb-10">
        <span className="text-red-500">Hi,</span> Welcome
        <span className="text-green-500"> Mr. {user?.displayName}</span>
      </h1>
      {/* table format */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase bg-red-500 text-white">
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {donations.map((donation) => (
              <tr key={donation._id}>
                <th>{donation?.name}</th>
                <td>
                  <div className="flex gap-2">
                    <p>{donation?.upazila},</p>
                    <p>{donation?.district}</p>
                  </div>
                </td>
                <td>{donation?.date}</td>
                <td>{donation?.time}</td>
                <td>
                  <button
                    onClick={() => handleStatus(donation)}
                    className="text-green-500 font-bold"
                  >
                    {donation?.status}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Delete</span>
                  </button>
                  {/* Delete modal */}
                  <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    deleteDonation={deleteDonation}
                    id={donation._id}
                  />
                </td>

                <td>
                  <Link to={`/dashboard/update-donation-modal/${donation._id}`}>
                    <button className="bg-orange-500 px-4 py-0 rounded-full font-semibold">
                      Edit
                    </button>
                  </Link>
                </td>

                <td>
                  <Link to={`/bloodDonationRequestDetails/${donation._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-0 rounded-full font-semibold">
                      View
                    </button>
                  </Link>
                </td>

                <td className="px-5 py-5 bg-white text-sm">
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
                  <UpdateDashboardModal
                    open={open}
                    setOpen={setOpen}
                    modalHandler={modalHandler}
                    donation={donation}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorDashboard;
