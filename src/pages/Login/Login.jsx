import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setError("");
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl border-2 mx-auto mt-12 mb-8">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Please Login</h1>
        <p className="text-sm dark:text-gray-600">
          Sign in to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email Address:
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-md border"
              {...register("email", {required: true})}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              {...register("password", {required: true})}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="button"
              className="block w-full p-3 text-center text-xl font-semibold rounded-sm bg-orange-500"
            >
              Login
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Don`t have an account yet?
            <Link to="/register" className="hover:underline ml-2">
              <span className="text-orange-500 font-bold">Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Login;
