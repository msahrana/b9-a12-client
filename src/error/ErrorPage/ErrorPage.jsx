import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-red-500">
            <span className="sr-only">Error</span>4
            <span className="text-black">0</span>4
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn`t find this Page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link to="/" className="px-8 py-3 font-semibold rounded bg-amber-500">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
