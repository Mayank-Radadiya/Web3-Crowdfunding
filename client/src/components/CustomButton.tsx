import React from "react";

interface CustomButtonProps {
  btnType: "button" | "submit" | "reset";
  title: string;
  handleClick?: () => void;
  styles?: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
  icon,
  isDisabled = false,
  variant = "primary",
}: CustomButtonProps) => {
  // Generate appropriate color classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] text-white hover:opacity-90";
      case "secondary":
        return "bg-gradient-to-r from-[#1dc071] to-[#2ecc71] text-white hover:opacity-90";
      case "outline":
        return "bg-transparent border border-[#3a3a43] text-white hover:bg-[#3a3a43]/30";
      default:
        return "bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] text-white hover:opacity-90";
    }
  };

  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px] flex justify-center items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${getVariantClasses()} ${styles}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {icon && <span>{icon}</span>}
      {title}
    </button>
  );
};

export default CustomButton;
