import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { thirdweb } from "../assets";
import { CustomButton, Loader } from "../components";

// Sample campaign data - replace with actual data from your backend
const sampleCampaigns = [
  {
    id: "1",
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    title: "Fund the Future",
    description:
      "Help us build a sustainable future with innovative technology that addresses climate change and promotes renewable energy solutions. Our team of engineers and scientists are developing cutting-edge systems that can help communities reduce their carbon footprint while increasing energy efficiency.",
    target: "10.0",
    deadline: "2025-06-01",
    amountCollected: "5.2",
    image:
      "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=500&auto=format&fit=crop",
    donators: [
      {
        address: "0xabcd1234abcd1234abcd1234abcd1234abcd1234",
        donation: "1.5",
      },
      {
        address: "0xefgh5678efgh5678efgh5678efgh5678efgh5678",
        donation: "2.0",
      },
      {
        address: "0xijkl9012ijkl9012ijkl9012ijkl9012ijkl9012",
        donation: "1.7",
      },
    ],
  },
  {
    id: "2",
    owner: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    title: "Clean Water Initiative",
    description:
      "Providing clean water to communities in need around the world. Our project aims to build sustainable water purification systems in areas with limited access to clean drinking water. With your support, we can help prevent waterborne diseases and improve quality of life in these communities.",
    target: "5.0",
    deadline: "2025-05-15",
    amountCollected: "3.7",
    image:
      "https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?q=80&w=500&auto=format&fit=crop",
    donators: [
      {
        address: "0x1234abcd1234abcd1234abcd1234abcd1234abcd",
        donation: "1.2",
      },
      {
        address: "0x5678efgh5678efgh5678efgh5678efgh5678efgh",
        donation: "2.5",
      },
    ],
  },
];

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([] as any[]);
  const [campaign, setCampaign] = useState<any>(sampleCampaigns);

  // Fetch campaign details - replace with actual data fetching logic
  useEffect(() => {
    setIsLoading(true);
    const foundCampaign = sampleCampaigns.find((c) => c.id === id);
    if (foundCampaign) {
      // setCampaign(foundCampaign);
      setDonators(foundCampaign?.donators);
    }
    setIsLoading(false);
  }, [id]);

  const handleDonate = async () => {
    setIsLoading(true);

    // Mock donation functionality - replace with actual blockchain implementation
    setTimeout(() => {
      alert(`Thank you for your donation of ${amount} ETH!`);
      setAmount("");
      setIsLoading(false);
    }, 1000);
  };

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

      {!isLoading && campaign && donators.length > 0 && (
        <div className="mt-[60px] bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] rounded-[15px] p-6 border border-[#3a3a43]/30 shadow-lg">
          <h4 className="font-epilogue font-semibold text-[22px] text-white">
            Donators
          </h4>

          <div className="mt-[20px] flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
            {donators.map((donator: any, index: number) => (
              <div
                key={`${donator.address}-${index}`}
                className="flex justify-between items-center gap-4 bg-[#13131a] p-4 rounded-[10px] border border-[#3a3a43]/30 hover:bg-[#13131a]/80 transition-colors duration-200"
              >
                <p className="font-epilogue font-normal text-[16px] text-white leading-[26px]">
                  {index + 1}. {formatAddress(donator.address)}
                </p>
                <p className="font-epilogue font-normal text-[16px] text-[#1dc071] leading-[26px]">
                  {donator.donation} ETH
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
