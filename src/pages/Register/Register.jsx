import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

const Register = () => {
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
        <h1 className="my-3 text-4xl font-bold">Please Register</h1>
        <p className="text-sm dark:text-gray-600">
          Sign Up to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email Address:
            </label>
            <input
              type="text"
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
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="button"
              className="block w-full p-3 text-center text-xl font-semibold rounded-sm bg-orange-500"
            >
              Register
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Already have an account yet?
            <Link to="/login" className="hover:underline ml-2">
              <span className="text-orange-500 font-bold">Login</span>
            </Link>
          </p>
        </div>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Register;
