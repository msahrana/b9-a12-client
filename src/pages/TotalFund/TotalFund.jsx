import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const TotalFund = () => {
  const [funds, setFunds] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/payments?page=${currentPage}&size=${itemsPerPage}`
      );
      setFunds(data);
    };
    getData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const getCount = async () => {
      const {data} = await axios(
        `${import.meta.env.VITE_API_URL}/payment-count`
      );
      setCount(data.count);
    };
    getCount();
  }, []);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="min-h-[calc(100vh-212px)]">
      <h1 className="text-5xl text-center font-bold my-10">Total Fund</h1>
      <div className="text-center mb-10">
        <Link to="/funding">
          <button className="bg-red-500 text-white rounded-full px-4 py-1">
            Pay Some Money
          </button>
        </Link>
      </div>
      {/* table */}
      <div className="overflow-x-auto md:ml-16 px-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-red-500 text-white uppercase">
              <th>Sl. No.</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>TransactionId</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {funds.map((fund, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{fund.name}</td>
                <td>$ {fund.price}</td>
                <td>{fund.date}</td>
                <td>{fund.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default TotalFund;
