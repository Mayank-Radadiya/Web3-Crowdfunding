import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navLinks } from "../constants";

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name
        ? "bg-gradient-to-r from-[#2c2f32] to-[#3c3f42] shadow-lg"
        : "hover:bg-[#2c2f32]/40"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles} transition-all duration-300`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${
          isActive !== name ? "grayscale opacity-80" : "filter drop-shadow-md"
        } transition-all duration-200`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/" className="group">
        <Icon
          styles="w-[52px] h-[52px] bg-gradient-to-br from-[#2c2f32] to-[#3c3f42] shadow-md border border-[#3a3a43]/30 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300"
          imgUrl={logo}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-gradient-to-b from-[#1c1c24] to-[#2c2c34] rounded-[20px] w-[76px] py-4 mt-12 shadow-xl border border-[#3a3a43]/30">
        <div className="flex flex-col justify-center items-center gap-4 mt-3">
          {navLinks.map((link, index) => (
            <div key={link.name} className="relative group">
              <div
                className={`absolute left-16 bg-[#191921] px-3 py-2 rounded-[5px] font-epilogue font-medium text-white text-[12px] opacity-0 group-hover:opacity-100 pointer-events-none transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-lg border border-[#3a3a43]/30 z-50 ${
                  isActive === link.name ? "text-[#1dc071]" : ""
                }`}
              >
                {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
              </div>
              <Icon
                {...link}
                isActive={isActive}
                handleClick={() => {
                  setIsActive(link.name);
                  navigate(link.link);
                }}
              />
            </div>
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] hover:bg-[#2c2f32]/40 border border-[#3a3a43]/30 shadow-md hover:shadow-lg mb-3"
          imgUrl={sun}
        />
      </div>
    </div>
  );
};

export default Sidebar;
