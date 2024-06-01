import logo from "../../../public/images/auth-logo.jpg";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const {user, setUser, createUser, updateUser} = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    const {name, photo, email, password} = data || {};

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("User Create Successfully!");
        updateUser(name, photo);
        setUser({...user, displayName: name, photo: photo});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <p className="mt-3 text-xl text-center text-gray-600 ">
            Get Your Free Account Now.
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <div className="text-xs text-center text-gray-500 uppercase  hover:underline">
              Registration with email
            </div>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="name"
              >
                Name:
              </label>
              <input
                id="name"
                autoComplete="name"
                name="name"
                className="block w-full px-4 py-2 border rounded"
                type="text"
                placeholder="Name"
                {...register("name", {required: true})}
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="photo"
              >
                Photo URL:
              </label>
              <input
                id="photo"
                autoComplete="photo"
                name="photo"
                className="block w-full px-4 py-2 border rounded"
                type="text"
                placeholder="PhotoURL"
                {...register("photoURL", {required: true})}
              />
              {errors.photoURL && (
                <span className="text-red-500">PhotoURL is required</span>
              )}
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address:
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                className="block w-full px-4 py-2 border rounded"
                type="email"
                placeholder="Email"
                {...register("email", {required: true})}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password:
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2 border rounded"
                type="password"
                placeholder="Password"
                {...register("password", {required: true})}
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium bg-red-600 text-white "
              >
                Register
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/login"
              className="text-xs text-gray-500 uppercase  hover:underline"
            >
              or <span className="text-red-500 font-bold">Login</span>
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${logo})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
