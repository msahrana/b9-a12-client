import useAuth from "../../../hooks/useAuth/useAuth";

const DonorDashboard = () => {
  const {user} = useAuth();

  return (
    <div className="md:ml-16">
      <h1 className="text-4xl font-semibold mb-10">
        <span className="text-red-500">Hi,</span> Welcome
        <span className="text-green-500"> Mr. {user?.displayName}</span>
      </h1>
      <div></div>
    </div>
  );
};

export default DonorDashboard;
