import {Link, useParams} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const _id = useParams();
  console.log(_id);

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/blogs`);
      return data;
    },
  });

  const handleStatus = (blog) => {
    axiosSecure.patch(`/blog/${blog._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Status Updated");
      }
    });
  };

  const handleDelete = (blog) => {
    axiosSecure.delete(`/blog/${blog._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        toast.success("Blog Delete Successfully!");
      }
    });
  };

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mt-6">
        Content Management:
      </h2>
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
                  <button
                    onClick={() => handleStatus(blog)}
                    className="text-green-500 font-bold"
                  >
                    {blog.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(blog)}
                    className="bg-red-500 px-3 py-1 rounded-full text-white"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/blog-modal/${blog._id}`}>
                    <button className="bg-yellow-500 px-6 py-1 rounded-full text-white">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;
