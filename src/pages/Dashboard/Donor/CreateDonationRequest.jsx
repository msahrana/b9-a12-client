import toast from "react-hot-toast";
import {districts} from "../../../components/Address/District";
import {upazilas} from "../../../components/Address/Upazila";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

const CreateDonationRequest = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const recipientName = form.recipientName.value;
    const hospitalName = form.hospitalName.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const fullAddress = form.fullAddress.value;
    const date = form.date.value;
    const time = form.time.value;
    const message = form.message.value;
    console.log(
      name,
      email,
      recipientName,
      hospitalName,
      district,
      upazila,
      fullAddress,
      date,
      time,
      message
    );

    try {
      const donation = {
        name,
        email,
        recipientName,
        hospitalName,
        district,
        upazila,
        fullAddress,
        date,
        time,
        message,
        status: "pending",
      };
      const {data} = await axiosSecure.post("/donations", donation);
      if (data.insertedId) {
        toast.success("Donation Create Successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.massage);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6">
        Create Donation Request:
      </h1>
      <div className="w-[60%] container mx-auto mt-10 border-2 p-5 rounded">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row lg:flex-row gap-6">
            <div className="w-full pl-2">
              <h2 className="font-medium">Requester Name:</h2>
              <input
                type="text"
                name="name"
                className="border rounded pl-2 w-full mt-1"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>

            <div className="w-full pl-2">
              <h2 className="font-medium">Requester Email:</h2>
              <input
                type="email"
                name="email"
                className="border rounded pl-2 w-full mt-1"
                defaultValue={user?.email}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-6">
            <div className="w-full pl-2">
              <h2 className="font-medium">Recipient Name:</h2>
              <input
                type="text"
                name="recipientName"
                className="border rounded pl-2 w-full mt-1"
                placeholder="Recipient Name"
                required
              />
            </div>

            <div className="w-full pl-2">
              <h2 className="font-medium">Hospital Name:</h2>
              <input
                type="text"
                name="hospitalName"
                className="border rounded pl-2 w-full mt-1"
                placeholder="Hospital Name"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-6">
            <div className="w-full pl-2">
              <h2 className="font-medium">District:</h2>
              <select
                required
                className="border rounded pl-2 w-full mt-1"
                name="district"
              >
                {districts.map((district) => (
                  <option value={district.name} key={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full pl-2">
              <h2 className="font-medium">Upazila:</h2>
              <select
                required
                className="border rounded pl-2 w-full mt-1"
                name="upazila"
              >
                {upazilas.map((upazila) => (
                  <option value={upazila.name} key={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full pl-2 mt-6">
            <h2 className="font-medium">Full Address:</h2>
            <input
              type="text"
              name="fullAddress"
              className="border rounded pl-2 w-full mt-1"
              placeholder="Full Address"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-6">
            <div className="form-control w-full">
              <h2 className="font-medium">Date:</h2>
              <input
                type="date"
                placeholder="date"
                name="date"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control w-full">
              <h2 className="font-medium">Time:</h2>
              <input
                type="time"
                placeholder="time"
                name="time"
                className="input input-bordered"
                required
              />
            </div>

            {/* <div className="w-full pl-2">
              <h2 className="font-medium">donation Time: (--am or --pm)</h2>
              <input
                type="text"
                name="time"
                className="border rounded pl-2 w-full mt-1"
                readOnly
              />
            </div> */}
          </div>

          <div className="w-full pl-2 mt-6">
            <h2 className="font-medium">Request Message:</h2>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Request Message"
              name="message"
            ></textarea>
          </div>

          <div className="w-full mt-10">
            <button className="bg-red-500 text-xl font-bold px-3 py-1 rounded-xl w-full">
              Add Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
