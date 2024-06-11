import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth/useAuth";
import {imageUpload} from "../../api/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import {useNavigate} from "react-router-dom";

const AddBlog = () => {
  const {setLoading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.files[0];
    const content = form.content.value;
    console.log(title, image, content);
    try {
      setLoading(true);
      const image_url = await imageUpload(image);
      const blogData = {
        title,
        image_url,
        content,
        status: "draft",
      };
      const {data} = await axiosSecure.post("/blogs", blogData);
      console.log(data);
      toast.success("Blog Create Successfully!");
      navigate("/dashboard/content-management");
    } catch (error) {
      console.log(error);
      toast.error(error.massage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-212px)]">
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">Add a Blog</h1>
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

export default AddBlog;
