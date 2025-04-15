import React from "react";
import { search } from "../assets";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  styles,
}) => {
  return (
    <div
      className={`flex items-center bg-[#1c1c24] rounded-[100px] border border-[#3a3a43]/30 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden ${styles}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent font-epilogue text-white text-[14px] outline-none py-3 px-5"
      />
      <div className="w-[52px] h-[52px] rounded-r-full bg-gradient-to-r from-[#4acd8d] to-[#2ecc71] flex justify-center items-center cursor-pointer hover:opacity-90 transition-opacity duration-200">
        <img
          src={search}
          alt="search"
          className="w-[18px] h-[18px] object-contain"
        />
      </div>
    </div>
  );
};

export default SearchBar;
