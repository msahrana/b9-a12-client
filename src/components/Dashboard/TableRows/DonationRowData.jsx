// import PropTypes from "prop-types";
import {format} from "date-fns";
import {useState} from "react";
import DeleteModal from "../../Modal/DeleteModal";
import {Link} from "react-router-dom";

const DonationRowData = ({donation, _id, deleteDonation}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{donation?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex">
          <p className="text-gray-900 whitespace-no-wrap">
            {donation?.upazila},
          </p>
          <p className="text-gray-900 whitespace-no-wrap ml-2">
            {donation?.district}
          </p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(donation?.date), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{donation?.time}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{donation?.status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
          id={_id}
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`/dashboard/update-donation-modal/${_id}`}>
          <button className="bg-orange-500 px-4 py-0 rounded-full font-semibold">
            Edit
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default DonationRowData;
