import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { thirdweb } from "../assets";
import { CustomButton, Loader } from "../components";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { daysLeft } from "../utils";
import toast from "react-hot-toast";
import { ethers } from "ethers";

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([] as any[]);
  const [campaign, setCampaign] = useState<any>([]);

  const { contract } = useContract(
    "0x476C70693E0C143953f3284f23aE21C62b4E2240"
  );

  if (!id) {
    return <div>Invalid campaign ID</div>;
  }

  // Fetch campaign details - replace with actual data fetching logic
  useEffect(() => {
    setIsLoading(true);
    const fetchCampaignDetails = async () => {
      if (!contract) return;

      try {
        const campaignData = await contract.call("campaigns", [id]);

        const parsedCampaign = {
          owner: campaignData.owner,
          title: campaignData.title,
          description: campaignData.description,
          target: campaignData.target.toString(),
          deadline: campaignData.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaignData.amountCollected),
          image: campaignData.image,
        };

        setCampaign(parsedCampaign);

        // Fetch donators list
        const donations = await contract.call("getDonatorsList", [id]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
          parsedDonations.push({
            address: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i]),
          });
        }

        setDonators(parsedDonations);
      } catch (error) {
        console.error("Failed to fetch campaign details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaignDetails();
  }, [contract, id]);

  const handleDonate = async () => {
    if (!contract) return;
    setIsLoading(true);
    const parsedAmount = parseFloat(amount);
    if (parsedAmount > 0) {
      await contract.call("donateCampaign", [id], {
        value: ethers.utils.parseEther(amount),
      });

      toast.success("Thanks for your donation!");

      setIsLoading(false);
      return;
    }
  };

  // Format address to show only first and last few characters
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Calculate days left until deadline
  const calculateDaysLeft = (deadline: number) => {
    // Ensure deadline is a valid number
    if (isNaN(deadline) || deadline <= 0) {
      return 0;
    }

    const deadlineDate = new Date(deadline * 1000); // Convert Unix timestamp (seconds) to milliseconds
    const currentDate = new Date();

    // Calculate difference in milliseconds
    const difference = deadlineDate.getTime() - currentDate.getTime();

    // Convert to days and round up to include partial days
    const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));

    // Return 0 if deadline has passed or is today
    return daysLeft > 0 ? daysLeft : 0;
  };

  // Calculate progress percentage
  const calculateProgress = (collected: string, target: string) => {
    return Math.min(100, (parseFloat(collected) / parseFloat(target)) * 100);
  };

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && !campaign && (
        <div className="flex flex-col justify-center items-center py-16">
          <h1 className="font-epilogue font-bold text-[20px] text-white text-center">
            Campaign not found
          </h1>
          <p className="font-epilogue text-[#a8a8b3] text-center mt-2 mb-8">
            The campaign you're looking for doesn't exist or has been removed.
          </p>
          <CustomButton
            btnType="button"
            title="Browse Campaigns"
            styles="bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] min-w-[180px] shadow-lg hover:shadow-xl transition-all duration-300"
            handleClick={() => navigate("/")}
          />
        </div>
      )}

      {!isLoading && campaign && (
        <div className="flex md:flex-row flex-col gap-[30px]">
          <div className="flex-1 rounded-[15px] flex flex-col overflow-hidden">
            <img
              src={campaign.image}
              alt="campaign"
              className="w-full h-[410px] object-cover shadow-lg rounded-t-[15px]"
            />

            <div className="flex flex-col p-4 bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-b-[15px] border border-[#3a3a43]/30 shadow-lg">
              <div className="relative w-full h-[5px] bg-[#3a3a43] rounded-full mt-6">
                <div
                  className="absolute h-full bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] rounded-full"
                  style={{
                    width: `${calculateProgress(
                      campaign.amountCollected,
                      campaign.target
                    )}%`,
                    transition: "width 1.5s ease-in-out",
                  }}
                ></div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="font-epilogue font-semibold text-[16px] text-white">
                  {campaign.amountCollected} ETH
                  <span className="font-epilogue font-normal text-[14px] text-[#a8a8b3] ml-1">
                    raised of {campaign.target} ETH
                  </span>
                </p>
                <p className="font-epilogue font-semibold text-[16px] text-white">
                  {calculateDaysLeft(campaign.deadline)}
                  <span className="font-epilogue font-normal text-[14px] text-[#a8a8b3] ml-1">
                    days left
                  </span>
                </p>
              </div>

              <div className="flex items-center mt-[20px] gap-[12px]">
                <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center bg-[#13131a]">
                  <img
                    src={thirdweb}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white">
                    Creator
                  </h4>
                  <p className="font-epilogue font-normal text-[12px] text-[#a8a8b3]">
                    {formatAddress(campaign.owner)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-[40px] max-w-[500px]">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col p-6 bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-[15px] border border-[#3a3a43]/30 shadow-lg">
                <h4 className="font-epilogue font-semibold text-[22px] text-white">
                  Fund the Campaign
                </h4>

                <div className="mt-[30px]">
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.01"
                    className="w-full py-[10px] px-[15px] outline-none border border-[#3a3a43] bg-transparent text-white text-[18px] font-epilogue leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  <div className="mt-[20px] bg-[#13131a] rounded-[10px] p-4">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#a8a8b3]">
                      Support the project for no reward, just because it speaks
                      to you.
                    </p>
                  </div>

                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] mt-[20px] shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90"
                    handleClick={handleDonate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && campaign && (
        <div className="mt-[60px] bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-[15px] p-6 border border-[#3a3a43]/30 shadow-lg">
          <h4 className="font-epilogue font-semibold text-[22px] text-white">
            Campaign Story
          </h4>
          <p className="font-epilogue font-normal text-[16px] text-[#a8a8b3] leading-[26px] mt-[20px]">
            {campaign.description}
          </p>
        </div>
      )}

      {!isLoading && campaign && (
        <div className="mt-[60px] bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-[15px] p-6 border border-[#3a3a43]/30 shadow-lg">
          <h4 className="font-epilogue font-semibold text-[22px] text-white">
            Donators
          </h4>

          {donators.length > 0 ? (
            <div className="mt-[20px] flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
              {donators.map((donator: any, index: number) => (
                <div
                  key={`${donator.address}-${index}`}
                  className="flex justify-between items-center gap-4 bg-[#13131a] p-4 rounded-[10px] border border-[#3a3a43]/30 hover:bg-[#13131a]/80 transition-colors duration-200"
                >
                  <p className="font-epilogue font-normal text-[16px] text-white leading-[26px]">
                    {index + 1}. {donator.address}
                  </p>
                  <p className="font-epilogue font-normal text-[16px] text-[#1dc071] leading-[26px]">
                    {donator.donation} ETH
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-[20px] flex flex-col items-center justify-center py-8 bg-[#13131a] rounded-[10px] border border-[#3a3a43]/30">
              <p className="font-epilogue text-[16px] text-[#a8a8b3] text-center">
                No donations yet. Be the first to support this campaign!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
