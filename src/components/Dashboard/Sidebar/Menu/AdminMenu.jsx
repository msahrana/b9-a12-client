import {FaUserCog} from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="All Users" address="all-users" />
      <MenuItem
        icon={FaUserCog}
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

export default AdminMenu;
