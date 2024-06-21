import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import {useState} from "react";

const Funding = () => {
  const {user} = useAuth();
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const price = parseFloat(form.price.value);
    console.log(name, email, price);
  };

  return (
    <div className="min-h-[calc(100vh-212px)]">
      <h1 className="md:text-4xl font-bold my-10 text-center">
        Please Funding a Small Amount:
      </h1>
      {/* form info */}
      <div className="w-full md:w-1/3 mx-auto p-3 border-2 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h2>Full Name:</h2>
            <input
              type="text"
              className="border pl-2 rounded-md w-full"
              name="name"
              id="name"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>

          <div className="mb-5">
            <h2>Email:</h2>
            <input
              type="email"
              className="border pl-2 rounded-md w-full"
              name="email"
              id="email"
              defaultValue={user?.email}
              readOnly
            />
          </div>

          <div className="mb-5">
            <h2>Price:</h2>
            <input
              type="number"
              className="border pl-2 rounded-md w-full"
              name="price"
              id="price"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <Link to={`/payment/${price}`}>
              <button
                type="submit"
                className="bg-red-500 w-full py-1 text-white font-bold"
              >
                Payment
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Funding;
