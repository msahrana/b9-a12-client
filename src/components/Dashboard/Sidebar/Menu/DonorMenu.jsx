import {FaUserCog} from "react-icons/fa";
import MenuItem from "./MenuItem";
import {MdBloodtype} from "react-icons/md";

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdBloodtype}
        label="My Donation Requests"
        address="my-donation-requests"
      />
      <MenuItem
        icon={FaUserCog}
        label="Create Donation Request"
        address="create-donation-request"
      />
    </>
  );
};

export default DonorMenu;
