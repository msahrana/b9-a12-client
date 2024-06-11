import {FaUsers} from "react-icons/fa";
import {MdBloodtype} from "react-icons/md";
import {AiFillDollarCircle} from "react-icons/ai";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {data: statData = {}, isLoading} = useQuery({
    queryKey: ["statData"],
    queryFn: async () => {
      const {data} = await axiosSecure.get("/admin-stat");
      return data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div className="md:ml-16">
      <h1 className="text-4xl font-semibold mb-10">
        <span className="text-red-500">Hi,</span> Welcome
        <span className="text-green-500"> Mr. {user?.displayName}</span>
      </h1>
      <div className="flex flex-col md:flex-row lg:flex-row gap-5">
        <div className=" border-2 p-4 flex items-center bg-blue-400 text-white w-1/3">
          <FaUsers className="text-6xl" />
          <div className="ml-5">
            <h1 className="text-3xl font-semibold">Total Users:</h1>
            <p className="text-5xl">{statData?.totalUsers}</p>
          </div>
        </div>

        <div className=" border-2 p-4 flex items-center bg-red-400 text-white w-1/3">
          <MdBloodtype className="text-6xl" />
          <div className="ml-5">
            <h1 className="text-3xl font-semibold">
              Total Blood Donation Request:
            </h1>
            <p className="text-5xl">{statData?.totalDonation}</p>
          </div>
        </div>

        <div className=" border-2 p-4 flex items-center bg-lime-400 text-white w-1/3">
          <AiFillDollarCircle className="text-6xl" />
          <div className="ml-5">
            <h1 className="text-3xl font-semibold">Total Funding:</h1>
            <p className="text-5xl">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
