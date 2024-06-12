import {Link} from "react-router-dom";

const DonationRequestCard = ({donation}) => {
  const {recipientName, date, time, district, upazila, _id} = donation || {};

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Name: {recipientName}</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div>
        <div>
          <p>
            Location: {upazila}, {district}
          </p>
        </div>
        <div className="w-full">
          <Link to={`/bloodDonationRequestDetails/${_id}`}>
            <button className="bg-red-500 w-full rounded py-2 text-white text-xl font-semibold">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestCard;
