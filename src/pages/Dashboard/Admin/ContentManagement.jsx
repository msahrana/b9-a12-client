import {Link, useParams} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
// import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole/useRole";
import {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth/useAuth";

const ContentManagement = () => {
  const [role] = useRole();
  const {loading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const _id = useParams();
  console.log(_id);

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/all-blogs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`
      );
      setBlogs(data);
    };
    getData();
  }, [currentPage, itemsPerPage, filter]);

  useEffect(() => {
    const getCount = async () => {
      const {data} = await axios(
        `${import.meta.env.VITE_API_URL}/blogs-count?filter=${filter}`
      );
      setCount(data.count);
    };
    getCount();
  }, [filter]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
  };

  // const {
  //   data: blogs = [],
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["blogs"],
  //   queryFn: async () => {
  //     const {data} = await axiosSecure.get(`/blogs`);
  //     return data;
  //   },
  // });

  const handleStatus = (blog) => {
    axiosSecure.patch(`/blog/${blog._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        const data = blogs.map((item) => {
          if (item._id === blog._id) {
            item.status = "published";
          }
          return item;
        });
        setBlogs(data);
        toast.success("Blog Status Updated!");
      }
    });
  };

  const handleDelete = (blog) => {
    axiosSecure.delete(`/blog/${blog._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        const data = blogs.filter((item) => item._id !== blog._id);
        setBlogs(data);
        toast.success("Blog Delete Successfully!");
      }
    });
  };

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mt-6">
        Content Management:
      </h2>
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
            <option value="published">published</option>
            <option value="draft">draft</option>
          </select>
        </div>
        {/* reset */}
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
      <div className="text-right mt-6">
        <Link to="/dashboard/content-management/add-blog">
          <button className="bg-red-500 text-2xl font-semibold text-white rounded-full px-3 py-1">
            Add Blog
          </button>
        </Link>
      </div>
      {/* table */}
      <div className="overflow-x-auto md:ml-16">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {blogs.map((blog, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={blog.image_url}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{blog.title}</div>
                </td>
                <td>
                  {role === "admin" ? (
                    <button
                      onClick={() => handleStatus(blog)}
                      className="text-green-500 font-bold"
                    >
                      {blog.status}
                    </button>
                  ) : (
                    <button className="text-green-500 font-bold">
                      {blog.status}
                    </button>
                  )}
                </td>
                <td>
                  {role === "admin" ? (
                    <button
                      onClick={() => handleDelete(blog)}
                      className="bg-red-500 px-3 py-1 rounded-full text-white"
                    >
                      Delete
                    </button>
                  ) : (
                    <button className="bg-red-500 px-3 py-1 rounded-full text-white">
                      Delete
                    </button>
                  )}
                </td>
                <td>
                  {role === "admin" ? (
                    <Link to={`/dashboard/blog-modal/${blog._id}`}>
                      <button className="bg-yellow-500 px-6 py-1 rounded-full text-white">
                        Edit
                      </button>
                    </Link>
                  ) : (
                    <button className="bg-yellow-500 px-6 py-1 rounded-full text-white">
                      Edit
                    </button>
                  )}
                </td>
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

export default ContentManagement;
