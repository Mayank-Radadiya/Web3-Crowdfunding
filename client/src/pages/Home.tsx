import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import { Loader2 } from "lucide-react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";

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

const Home = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the contract hook at the component level
  const { contract } = useContract(
    "0x476C70693E0C143953f3284f23aE21C62b4E2240"
  );

  // Fetch campaigns once the contract is loaded
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!contract) return;

      try {
        const data = await contract.call("getAllCampaigns");
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
          setCampaigns(formattedCampaigns);
          setFilteredCampaigns(formattedCampaigns);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [contract]);

  // Filter campaigns when search term or campaigns change
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCampaigns(campaigns);
    } else {
      const results = campaigns.filter(
        (campaign) =>
          campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCampaigns(results);
    }
  }, [searchTerm, campaigns]);

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

  const handleCardClick = (id: string) => {
    navigate(`/campaign-details/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mb-10">
        <h1 className="font-epilogue font-bold text-white text-4xl text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4c4cc]">
          Discover and Support
        </h1>
        <h1 className="font-epilogue font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] text-4xl text-center mb-5">
          Innovative Campaigns
        </h1>
        <p className="font-epilogue text-[#a8a8b3] text-center max-w-[600px] mt-1 mb-6">
          Fund groundbreaking ideas, creative projects, and meaningful causes.
          Join our community of changemakers.
        </p>

        <div className="max-w-[800px] w-full mt-2 mb-8">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-[#1c1c24] rounded-[10px] border border-[#3a3a43]/30 shadow-md outline-none font-epilogue text-white text-[14px] placeholder:text-[#4b5264] transition-all duration-300 hover:shadow-lg focus:border-[#8c6dfd] focus:shadow-lg"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-white w-10 h-10" />
        </div>
      )}

      {!isLoading && filteredCampaigns.length === 0 && (
        <div className="flex flex-col justify-center items-center py-16">
          <h1 className="font-epilogue font-bold text-[20px] text-white text-center">
            No campaigns found
          </h1>
          <p className="font-epilogue text-[#a8a8b3] text-center mt-2 mb-8">
            Be the first to create a campaign!
          </p>
          <CustomButton
            btnType="button"
            title="Create a campaign"
            styles="bg-gradient-to-r from-[#8c6dfd] to-[#1dc071] min-w-[180px] shadow-lg hover:shadow-xl transition-all duration-300"
            handleClick={() => navigate("/create-campaign")}
          />
        </div>
      )}

      {!isLoading && filteredCampaigns.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-[#1c1c24] border border-[#3a3a43]/30 rounded-[15px] overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
              onClick={() => handleCardClick(campaign.id)}
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-[158px] object-cover"
              />

              <div className="p-5">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-epilogue font-medium text-[13px] text-[#b2b3bd] bg-[#13131a] px-3 py-1 rounded-full">
                      {calculateDaysLeft(campaign.deadline)} Days Left
                    </p>
                    <p className="font-epilogue font-medium text-[13px] text-[#b2b3bd]">
                      by {formatAddress(campaign.owner)}
                    </p>
                  </div>

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
                        Raised of {parseFloat(campaign.target)} ETH
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
