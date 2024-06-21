import {useState} from "react";
import {districts} from "../Address/District";
import {upazilas} from "../Address/Upazila";

const SearchPage = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const blood = form.blood.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    setSearch(blood, district, upazila);
  };
  console.log(search);

  return (
    <div className="min-h-[calc(100vh-212px)]">
      <h1 className="text-5xl font-bold text-center mt-10 ">Search Here:</h1>
      {/* form */}
      <div className="w-1/2 mx-auto border-2 rounded p-4 mt-5">
        <form onSubmit={handleSearch}>
          {/* blood group */}
          <label className="form-control w-full ">
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

          <div className="my-4 flex justify-between">
            {/* district */}
            <div className="space-y-1 text-sm w-full">
              <label htmlFor="district" className="block text-gray-600">
                District:
              </label>
              <select
                required
                className="w-full px-4 py-3 border focus:outline-rose-500 rounded-md"
                name="district"
              >
                {districts.map((district) => (
                  <option value={district.name} key={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            {/* upazila */}
            <div className="space-y-1 text-sm w-full">
              <label htmlFor="upazila" className="block text-gray-600">
                Upazila:
              </label>
              <select
                required
                className="w-full px-4 py-3 border ml-2 focus:outline-rose-500 rounded-md"
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

          <button className="w-full bg-red-500 text-xl text-white rounded-full py-1">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
