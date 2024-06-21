import {FaDollarSign, FaUserCog, FaUsers} from "react-icons/fa";
import MenuItem from "./MenuItem";
import {MdBloodtype} from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUsers} label="All Users" address="all-users" />
      <MenuItem
        icon={MdBloodtype}
        label="All Blood Donation Request"
        address="all-blood-donation-request"
      />
      <MenuItem
        icon={FaUserCog}
        label="Content Management"
        address="content-management"
      />
      <MenuItem icon={FaDollarSign} label="Total Fund" address="total-fund" />
    </>
  );
};

export default AdminMenu;
