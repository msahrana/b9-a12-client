import {useLoaderData} from "react-router-dom";

const BloodDonationRequestDetails = () => {
  const items = useLoaderData();
  const {recipientName, date, time, district, upazila, status} = items || {};

  return (
    <div className="min-h-[calc(100vh-196px)]">
      <div className="card w-96 bg-blue-100 shadow-xl mx-auto mt-6">
        <div className="card-body text-center">
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
          <div>
            <p>Status: {status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationRequestDetails;
