import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";
import toast from "react-hot-toast";
import {useState} from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const {data} = await axiosSecure(`/users?&filter=${filter}`);
      return data;
    },
  });

  const handleReset = () => {
    setFilter("");
  };

  const handleStatus = (user) => {
    axiosSecure.patch(`/user/status/${user._id}`).then((res) => {
      if (res.data.acknowledged) {
        refetch();
        toast.success("Status Updated");
      }
    });
  };

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 md:ml-9">
        <h1 className="text-3xl font-bold text-center mt-10">All Users:</h1>
        {/* filter */}
        <div className="ml-20 flex gap-6">
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              value={filter}
              name="status"
              id="status"
              className="border p-4 rounded-lg"
            >
              <option>Filter By Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          {/* reset */}
          <button onClick={handleReset} className="btn">
            Reset
          </button>
        </div>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Avatar
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <UserDataRow
                      key={user?._id}
                      user={user}
                      refetch={refetch}
                      handleStatus={handleStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
