import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  iconImg?: string;
  suffix?: string;
  description?: string;
  styles?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  iconImg,
  suffix,
  description,
  styles,
}) => {
  return (
    <div
      className={`bg-[#1c1c24] rounded-[15px] p-5 border border-[#3a3a43]/30 shadow-md hover:shadow-lg transition-all duration-300 ${styles}`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-[#8c6dfd]">{icon}</div>}
        {iconImg && (
          <div className="w-[40px] h-[40px] rounded-full bg-[#13131a] flex justify-center items-center">
            <img
              src={iconImg}
              alt="icon"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        )}
        <p className="font-epilogue font-semibold text-[15px] text-[#a8a8b3]">
          {title}
        </p>
      </div>

      <div className="mt-3">
        <h4 className="font-epilogue font-bold text-[24px] text-white leading-[30px]">
          {value}
          {suffix && <span className="ml-1 text-[16px]">{suffix}</span>}
        </h4>
        {description && (
          <p className="font-epilogue text-[14px] text-[#a8a8b3] mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
