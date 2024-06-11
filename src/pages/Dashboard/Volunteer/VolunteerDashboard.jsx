import {FaUsers} from "react-icons/fa";
import {MdBloodtype} from "react-icons/md";
import {AiFillDollarCircle} from "react-icons/ai";

const VolunteerDashboard = () => {
  return (
    <div className="md:ml-20 flex flex-col md:flex-row lg:flex-row gap-5 z-50">
      <div className=" border-2 p-4 flex items-center bg-blue-400 text-white w-1/3">
        <FaUsers className="text-6xl" />
        <div className="ml-5">
          <h1 className="text-3xl font-semibold">Total Users:</h1>
          <p className="text-5xl">5</p>
        </div>
      </div>

      <div className=" border-2 p-4 flex items-center bg-red-400 text-white w-1/3">
        <MdBloodtype className="text-6xl" />
        <div className="ml-5">
          <h1 className="text-3xl font-semibold">
            Total Blood Donation Request:
          </h1>
          <p className="text-5xl">5</p>
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
  );
};

export default VolunteerDashboard;
