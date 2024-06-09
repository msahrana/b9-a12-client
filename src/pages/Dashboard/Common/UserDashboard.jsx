import useRole from "../../../hooks/useRole/useRole";
import AdminDashboard from "../Admin/AdminDashboard";
import DonorDashboard from "../Donor/DonorDashboard";
import VolunteerDashboard from "../Volunteer/VolunteerDashboard";

const UserDashboard = () => {
  const [role, isLoading] = useRole();
  console.log(role);

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
