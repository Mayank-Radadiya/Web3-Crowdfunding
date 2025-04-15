import React, { useState } from "react";

interface FormFieldProps {
  labelName?: string;
  placeholder: string;
  inputType?: string;
  isTextArea?: boolean;
  value: string;
  refValue: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  helperText?: string;
}

const FormField = ({
  labelName,
  placeholder,
  inputType = "text",
  isTextArea,
  value,
  refValue,
  required = true,
  helperText,
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex-1 w-full flex flex-col gap-1">
      {labelName && (
        <div className="flex items-center gap-2">
          <label className="font-epilogue font-medium text-[15px] leading-[22px] text-white">
            {labelName}
          </label>
          {required && <span className="text-red-500 text-sm">*</span>}
        </div>
      )}

      <div className="relative">
        {isTextArea ? (
          <textarea
            required={required}
            ref={refValue as React.RefObject<HTMLTextAreaElement>}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={5}
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] 
            ${isFocused ? "border-[#8c6dfd]" : "border-[#3a3a43]"} 
            bg-[#1c1c24] font-epilogue text-white text-[14px] 
            placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] w-full
            shadow-sm hover:shadow-md transition-all duration-200`}
          />
        ) : (
          <input
            required={required}
            ref={refValue as React.RefObject<HTMLInputElement>}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type={inputType}
            step={inputType === "number" ? "0.01" : undefined}
            placeholder={placeholder}
            className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] 
            ${isFocused ? "border-[#8c6dfd]" : "border-[#3a3a43]"} 
            bg-[#1c1c24] font-epilogue text-white text-[14px] 
            placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] w-full
            shadow-sm hover:shadow-md transition-all duration-200`}
          />
        )}
      </div>

      {helperText && (
        <p className="text-[#a8a8b3] text-sm mt-1 font-epilogue">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
