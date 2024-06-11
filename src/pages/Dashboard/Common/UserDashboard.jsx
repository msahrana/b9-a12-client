import useRole from "../../../hooks/useRole/useRole";
import VolunteerDashboard from "../Volunteer/VolunteerDashboard";
import AdminDashboard from "../Admin/AdminDashboard";
import DonorDashboard from "../Donor/DonorDashboard";

const UserDashboard = () => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <>
      {role === "donor" && <DonorDashboard />}
      {role === "admin" && <AdminDashboard />}
      {role === "volunteer" && <VolunteerDashboard />}
    </>
  );
};

export default UserDashboard;
