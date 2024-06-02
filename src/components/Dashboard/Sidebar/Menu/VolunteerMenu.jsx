import {MdBloodtype} from "react-icons/md";
import MenuItem from "./MenuItem";
import {FaUserCog} from "react-icons/fa";

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
    </>
  );
};

export default VolunteerMenu;
