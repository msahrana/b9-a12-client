import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import {imageUpload} from "../../api/utils";
import {TbFidgetSpinner} from "react-icons/tb";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import {districts} from "../../components/Address/District";
import {upazilas} from "../../components/Address/Upazila";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {createUser, updateUser, loading, setLoading} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const blood = form.blood.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const email = form.email.value;
    const password = form.password.value;
    try {
      setLoading(true);
      const image_url = await imageUpload(image);
      await createUser(email, password);
      const newUser = {
        name,
        image_url,
        email,
        blood,
        district,
        upazila,
        user: {
          role: "donor",
          status: "active",
        },
      };
      const {data} = await axiosPublic.post("/users", newUser);
      console.log(data);
      await updateUser(name, image_url);
      navigate("/");
      toast.success("User Create Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.massage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Life Line</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Blood Group:</span>
              </div>
              <select className="select select-bordered" name="blood" required>
                <option disabled selected>
                  Select a Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </label>

            <div className="space-y-1 text-sm">
              <label htmlFor="district" className="block text-gray-600">
                District:
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="district"
              >
                {districts.map((district) => (
                  <option value={district.name} key={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="upazila" className="block text-gray-600">
                Upazila:
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="upazila"
              >
                {upazilas.map((upazila) => (
                  <option value={upazila.name} key={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password:
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        {/* <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button> */}
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600 font-bold"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
