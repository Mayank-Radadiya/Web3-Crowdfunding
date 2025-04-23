import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, thirdweb } from "../assets";
import { navLinks } from "../constants";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const connect = useMetamask();

  const address = localStorage.getItem("address");
  if (!address) {
    toast.error("Please connect your wallet first");
    navigate("/landing");
  }

  return (
    <div className="flex md:flex-row flex-col-reverse justify-end mb-[35px] gap-6">
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={
            address
              ? "bg-gradient-to-r from-[#1dc071] to-[#2ecc71] shadow-md hover:shadow-lg transition-all duration-300"
              : "bg-gradient-to-r from-[#8c6dfd] to-[#9f7eff] shadow-md hover:shadow-lg transition-all duration-300"
          }
          handleClick={() => {
            if (address) navigate("create-campaign");
            else {
              toast.error("Please connect your wallet first");
              connect();
            }
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer border border-[#3a3a43]/30 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#3c3f42]">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer shadow-md border border-[#3a3a43]/30">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-gradient-to-b from-[#1c1c24] to-[#2c2c34] z-10 shadow-xl py-4 rounded-[20px] border border-[#3a3a43]/30 ${
            !toggleDrawer ? "translate-y-[-100vh]" : "translate-y-0"
          } transition-all duration-500`}
        >
          <ul className="mb-4">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name ? "bg-[#3a3a43]/50" : ""
                } hover:bg-[#3a3a43]/30 transition-colors duration-200`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  } transition-all duration-200`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  } transition-colors duration-200`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect wallet"}
              styles={
                address
                  ? "bg-gradient-to-r from-[#1dc071] to-[#2ecc71] w-full"
                  : "bg-gradient-to-r from-[#8c6dfd] to-[#9f7eff] w-full"
              }
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
