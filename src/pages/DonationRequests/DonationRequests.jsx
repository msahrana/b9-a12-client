import {useQuery} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import DonationRequestCard from "./DonationRequestCard";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const {user, loading} = useAuth();

  const {data: donations = []} = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      if (user?.email) {
        const {data} = await axiosSecure.get(`/donations`);
        return data;
      }
    },
  });

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div className="min-h-[calc(100vh-212px)]">
      <h1 className="text-center text-4xl font-bold my-10">
        Donation Requests:
      </h1>
      <div className="divider"></div>
      {/* card section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {donations.map((donation) => (
          <DonationRequestCard
            key={donation._id}
            donation={donation}
          ></DonationRequestCard>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
