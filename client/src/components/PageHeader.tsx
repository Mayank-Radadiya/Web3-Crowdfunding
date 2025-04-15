import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col items-center mb-10 w-full">
      {subtitle && (
        <h2 className="font-epilogue font-bold text-white text-2xl text-center mb-1">
          {subtitle}
        </h2>
      )}
      <h1 className="font-epilogue font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] text-4xl text-center mb-4">
        {title}
      </h1>
      {description && (
        <p className="font-epilogue text-[#a8a8b3] text-center max-w-[750px] mt-1 mb-6">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default PageHeader;
