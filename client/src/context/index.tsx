import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  SmartContract,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Create interface for our campaign form data
interface CampaignFormData {
  title: string;
  description: string;
  image: string;
  deadline: string;
  target: string;
}

// Create interface for campaign data from contract
interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: ethers.BigNumber;
  deadline: ethers.BigNumber;
  amountCollected: ethers.BigNumber;
  image: string;
  donators: string[];
  donations: ethers.BigNumber[];
}

// Define the shape of our context
interface StateContextType {
  address: string | undefined;
  contract: SmartContract | undefined;
  // connect: () => Promise<void>;
  createCampaign: (form: CampaignFormData) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: number, amount: string) => Promise<void>;
  getDonations: (
    pId: number
  ) => Promise<{ donators: string[]; donations: ethers.BigNumber[] }>;
}

// Create context with default values
const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0x8Bd9851C4968f9f5AE54441f7f69b6c115f2E409"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract as any,
    "crateCampaign" // Note: This matches the contract's typo
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: CampaignFormData) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.image,
          new Date(form.deadline).getTime(),
          ethers.utils.parseUnits(form.target, 18),
        ],
      });
      console.log("✅ Contract call success", data);
    } catch (error) {
      console.log("Error creating campaign", error);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    const campaigns = await contract?.call("getAllCampaign");
    return campaigns || [];
  };

  const getUserCampaigns = async (): Promise<Campaign[]> => {
    const allCampaigns = await getCampaigns();
    const userCampaigns = allCampaigns.filter(
      (campaign: Campaign) =>
        campaign.owner.toLowerCase() === address?.toLowerCase()
    );
    return userCampaigns;
  };

  const donate = async (pId: number, amount: string) => {
    try {
      const data = await contract?.call("donateCampaign", pId, {
        value: ethers.utils.parseEther(amount),
      });
      console.log("✅ Donation successful", data);
      return data;
    } catch (error) {
      console.log("Error donating to campaign", error);
    }
  };

  const getDonations = async (pId: number) => {
    try {
      const donations = await contract?.call("getDonatorsList", pId);
      return {
        donators: donations[0],
        donations: donations[1],
      };
    } catch (error) {
      console.log("Error getting donations", error);
      return {
        donators: [],
        donations: [],
      };
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
