import React, { useState } from "react";
import { CustomButton } from ".";

interface DonationFormProps {
  onDonate: (amount: string) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onDonate }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    onDonate(amount);
  };

  const predefinedAmounts = ["0.1", "0.5", "1.0", "5.0"];

  return (
    <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-[15px] p-6 border border-[#3a3a43]/30 shadow-lg">
      <h2 className="font-epilogue font-semibold text-[22px] text-white mb-6">
        Fund this Campaign
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-epilogue text-[15px] text-white mb-2 block">
            Amount (ETH)
          </label>

          <div className="flex flex-wrap gap-2 mb-4">
            {predefinedAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  amount === presetAmount
                    ? "bg-[#8c6dfd] border-[#8c6dfd] text-white"
                    : "border-[#3a3a43] text-white hover:bg-[#3a3a43]/50"
                }`}
                onClick={() => {
                  setAmount(presetAmount);
                  setError("");
                }}
              >
                {presetAmount} ETH
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="ETH 0.1"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              className="w-full py-[15px] px-[15px] outline-none border border-[#3a3a43] bg-[#13131a] text-white text-[16px] font-epilogue leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8c6dfd] font-epilogue font-semibold">
              ETH
            </span>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="mt-[20px] bg-[#13131a]/50 rounded-[10px] p-4">
          <h4 className="font-epilogue font-semibold text-[15px] leading-[22px] text-white">
            Back it because you believe in it.
          </h4>
          <p className="mt-[15px] font-epilogue font-normal leading-[22px] text-[#a8a8b3]">
            Support the project for no reward, just because it speaks to you.
          </p>
        </div>

        <CustomButton
          btnType="submit"
          title="Fund Campaign"
          styles="w-full mt-6"
        />
      </form>
    </div>
  );
};

export default DonationForm;
