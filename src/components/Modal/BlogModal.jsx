import {useLoaderData, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import {imageUpload} from "../../api/utils";
import toast from "react-hot-toast";

const BlogModal = () => {
  const {setLoading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const item = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.files[0];
    const content = form.content.value;
    try {
      setLoading(true);
      const image_url = await imageUpload(image);
      const blogData = {
        title,
        image_url,
        content,
        status: "draft",
      };
      const {data} = await axiosSecure.put(`/blogs/${item._id}`, blogData);
      console.log(data);
      toast.success("Blog Update Successfully!");
      navigate("/dashboard/content-management");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.massage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-212px)]">
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">
          Edit Blog: {item.title}
        </h1>
      </div>
      <div className="w-1/3 container mx-auto border-2 p-3 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <h1 className="text-xl font-semibold">Title:</h1>
            <input
              className="w-full border rounded-md pl-2"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              defaultValue={item?.title}
            />
          </div>
          <div className="w-full mt-3">
            <h1 className="text-xl font-semibold">Image:</h1>
            <input
              required
              type="file"
              id="image"
              name="image"
              accept="image/*"
            />
          </div>
          <div className="w-full mt-3">
            <h1 className="text-xl font-semibold">content:</h1>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Content"
              name="content"
              defaultValue={item?.content}
            ></textarea>
          </div>
          <div className="w-full mt-5">
            <button className="bg-red-500 text-xl font-bold w-full py-1">
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
