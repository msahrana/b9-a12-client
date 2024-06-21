import {MdBloodtype} from "react-icons/md";
import MenuItem from "./MenuItem";
import {FaDollarSign, FaUserCog} from "react-icons/fa";

const VolunteerMenu = () => {
  return (
    <>
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

export default VolunteerMenu;
