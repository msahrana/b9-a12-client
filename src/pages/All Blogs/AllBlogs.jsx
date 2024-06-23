import {useQuery} from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import BlogsCard from "./BlogsCard";

const AllBlogs = () => {
  const axiosPublic = useAxiosPublic();

  const {data: blogs = []} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const {data} = await axiosPublic(`/blogs`);
      return data;
    },
  });

  return (
    <div className="min-h-[calc(100vh-172px)]">
      <h1 className="text-4xl text-center font-semibold mb-10">All Blogs </h1>
      {/* card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs
          .filter((item) => item.status === "published")
          .map((blog) => (
            <BlogsCard key={blog._id} blog={blog}></BlogsCard>
          ))}
      </div>
    </div>
  );
};

export default AllBlogs;
