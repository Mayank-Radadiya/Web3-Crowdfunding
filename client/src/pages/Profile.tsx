import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Loader2 } from "lucide-react";
import { CustomButton, Loader } from "../components";
import { profile } from "../assets";

interface Campaign {
  id: string;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
}

function Profile() {
  const navigate = useNavigate();
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Use the contract hook at the component level
  const { contract } = useContract(
    "0x476C70693E0C143953f3284f23aE21C62b4E2240"
  );

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      if (!contract || !address) return;

      try {
        setIsLoading(true);
        const data = await contract.call("getCurrentUserCampaign", [address]);

        if (data) {
          const formattedCampaigns = data.map((item: any, index: number) => ({
            id: index,
            owner: item.owner,
            title: item.title,
            description: item.description,
            target: item.target.toString(),
            deadline: item.deadline.toString(),
            amountCollected: ethers.utils.formatEther(item.amountCollected),
            image: item.image,
          }));

          // Filter out empty campaigns (in case the contract returns placeholders)
          const filteredCampaigns = formattedCampaigns.filter(
            (campaign: Campaign) =>
              campaign.owner !== "0x0000000000000000000000000000000000000000"
          );

          setCampaigns(filteredCampaigns);
        }
      } catch (error) {
        console.error("Failed to fetch user campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCampaigns();
  }, [contract, address]);

  // Format address to show only first and last few characters
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Calculate days left until deadline
  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(Number(deadline) * 1000);
    const currentDate = new Date();
    const difference = deadlineDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  // Calculate progress percentage
  const calculateProgress = (collected: string, target: string) => {
    if (parseFloat(target) === 0) return 0;
    return Math.min(100, (parseFloat(collected) / parseFloat(target)) * 100);
  };

  const handleCreateCampaign = () => {
    navigate("/create-campaign");
  };

  const handleCardClick = (id: string) => {
    navigate(`/campaign-details/${id}`);
  };

  return (
    <div className="flex flex-col min-h-[70vh]">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="font-epilogue font-bold text-white text-4xl text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4c4cc]">
          Your Campaign
        </h1>
        <h1 className="font-epilogue font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] text-4xl text-center mb-5">
          Dashboard
        </h1>

        {address && (
          <div className="flex items-center bg-[#13131a] px-4 py-2 rounded-full mb-4">
            <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#2c2f32] mr-3">
              <img
                src={profile}
                alt="user"
                className="w-[60%] h-[60%] object-contain"
              />
            </div>
            <p className="font-epilogue text-[#a8a8b3]">
              {formatAddress(address)}
            </p>
          </div>
        )}

        <p className="font-epilogue text-[#a8a8b3] text-center max-w-[600px] mt-1 mb-6">
          Manage your campaigns and track your impact. Your journey as a creator
          starts here.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-white w-10 h-10" />
        </div>
      )}

      {/* No Campaigns State */}
      {!isLoading && campaigns.length === 0 && (
        <div className="flex flex-col justify-center items-center py-16 bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-[20px] shadow-xl mx-auto px-10 max-w-[500px] w-full border border-[#3a3a43]/30">
          <h1 className="font-epilogue font-bold text-[22px] text-white text-center">
            You haven't created any campaigns yet
          </h1>
          <p className="font-epilogue text-[#a8a8b3] text-center mt-4 mb-8">
            Start your first campaign and bring your ideas to life!
          </p>
          <CustomButton
            btnType="button"
            title="Create a campaign"
            styles="bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300"
            handleClick={handleCreateCampaign}
          />
        </div>
      )}

      {/* Campaigns Grid */}
      {!isLoading && campaigns.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-epilogue font-bold text-white text-[18px]">
              Your campaigns ({campaigns.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-[#1c1c24] border border-[#3a3a43]/30 rounded-[15px] overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
                onClick={() => handleCardClick(campaign.id)}
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
                  <div className="flex flex-col">
                    <h3 className="font-epilogue font-bold text-[18px] text-white leading-[26px] truncate">
                      {campaign.title}
                    </h3>
                    <p className="font-epilogue text-[#a8a8b3] text-[14px] leading-[18px] truncate mt-1">
                      {campaign.description}
                    </p>

                    <div className="mt-4">
                      <div className="h-[5px] bg-[#3a3a43] rounded-full w-full mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] rounded-full"
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
                      <div className="flex flex-col">
                        <h4 className="font-epilogue font-bold text-[16px] text-white">
                          {campaign.amountCollected} ETH
                        </h4>
                        <p className="font-epilogue text-[#a8a8b3] text-[12px]">
                          Raised of{" "}
                          <span className="font-semibold text-white">
                            {campaign.target}
                          </span>{" "}
                          ETH
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
