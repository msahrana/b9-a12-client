import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import DonationRowData from "../../../components/Dashboard/TableRows/DonationRowData";
import {useParams} from "react-router-dom";

const MyDonationRequests = () => {
  const {user, loading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const _id = useParams();
  console.log(_id);

  const {data: donations = []} = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const {data} = await axiosSecure.get(`/donations/${user?.email}`);
        return data;
      }
    },
  });

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6">
        My Donation Requests:
      </h1>
      {/* filter */}
      <div className="ml-20">
        <h1>Filter by Status:</h1>
        {/* filter div */}
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
                    ></DonationRowData>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
