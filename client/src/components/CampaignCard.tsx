import React from "react";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  campaign: {
    id: string;
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: string;
    amountCollected: string;
    image: string;
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const navigate = useNavigate();

  // Format address to show only first and last few characters
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Calculate days left until deadline
  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const difference = deadlineDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    return daysLeft;
  };

  // Calculate progress percentage
  const calculateProgress = (collected: string, target: string) => {
    return Math.min(100, (parseFloat(collected) / parseFloat(target)) * 100);
  };

  return (
    <div
      className="bg-[#1c1c24] border border-[#3a3a43]/30 rounded-[15px] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
      onClick={() => navigate(`/campaign-details/${campaign.id}`)}
    >
      <div className="relative">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-[158px] object-cover"
        />
        <div className="absolute top-2 left-2 bg-[#13131a]/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <p className="font-epilogue font-medium text-[12px] text-white">
            {calculateDaysLeft(campaign.deadline)} Days Left
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-end">
          <p className="font-epilogue font-medium text-[13px] text-[#b2b3bd]">
            by {formatAddress(campaign.owner)}
          </p>
        </div>

        <h3 className="font-epilogue font-bold text-[18px] text-white leading-[26px] truncate mt-2">
          {campaign.title}
        </h3>
        <p className="font-epilogue text-[#a8a8b3] text-[14px] leading-[18px] truncate mt-1">
          {campaign.description}
        </p>

        <div className="mt-4">
          <div className="relative h-[5px] bg-[#3a3a43] rounded-full w-full mt-2">
            <div
              className="absolute h-full bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] rounded-full transition-all duration-700 ease-in-out"
              style={{
                width: `${calculateProgress(
                  campaign.amountCollected,
                  campaign.target
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 gap-2">
          <div>
            <h4 className="font-epilogue font-bold text-[16px] text-white">
              {campaign.amountCollected} ETH
            </h4>
            <p className="font-epilogue text-[#a8a8b3] text-[12px]">
              Raised of {campaign.target} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
