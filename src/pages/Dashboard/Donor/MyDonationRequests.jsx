import {useMutation} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import DonationRowData from "../../../components/Dashboard/TableRows/DonationRowData";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import axios from "axios";

const MyDonationRequests = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const {loading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const _id = useParams();
  console.log(_id);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/all-donations?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`
      );
      setDonations(data);
    };
    getData();
  }, [currentPage, itemsPerPage, filter]);

  useEffect(() => {
    const getCount = async () => {
      const {data} = await axios(
        `${import.meta.env.VITE_API_URL}/donations-count?filter=${filter}`
      );
      setCount(data.count);
    };
    getCount();
  }, [filter]);

  // const {data: donations = [], refetch} = useQuery({
  //   queryKey: ["donations"],
  //   queryFn: async () => {
  //     if (user?.email) {
  //       const {data} = await axiosSecure.get(
  //         `/all-donations?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`
  //       );
  //       return data;
  //     }
  //   },
  // });

  const {mutateAsync} = useMutation({
    mutationFn: async (_id) => {
      const {data} = await axiosSecure.delete(`/donation/${_id}`);
      return data;
    },
    onSuccess: async (data) => {
      console.log(data);
      toast.success("Blood Donation Deleted");
    },
  });

  //  Handle Delete
  const deleteDonation = async (id) => {
    try {
      await mutateAsync(id);
      const data = donations.filter((item) => item._id !== id);
      setDonations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
  };

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6">
        My Donation Requests:
      </h1>
      <div className="ml-20 flex gap-6">
        {/* filter */}
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            value={filter}
            name="status"
            id="status"
            className="border p-4 rounded-lg"
          >
            <option>Filter By Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        {/* reset */}
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
      {/* table format */}
      <div className="container mx-auto px-4 sm:px-8 ml-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Delete
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Room row data */}
                  {donations?.map((donation) => (
                    <DonationRowData
                      key={donation._id}
                      donation={donation}
                      _id={donation._id}
                      deleteDonation={deleteDonation}
                    ></DonationRowData>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className="flex justify-center mt-12">
        {/* previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>
        {/* pages */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-blue-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* next button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
