import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import toast from "react-hot-toast";
import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { contract } = useContract("0x476C70693E0C143953f3284f23aE21C62b4E2240");
  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");

  const address = useAddress();
  const connect = useMetamask();

  useEffect(() => {
    if (!address) {
      connect();
    }
  }, [address, connect]);

  const publishCampaign = async (formData: any) => {
    try {
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);
      console.log("🕒 Deadline timestamp:", deadlineTimestamp); // Debug log

      const data = await createCampaign({
        args: [
          address,
          formData.title,
          formData.description,
          formData.image,
          BigInt(deadlineTimestamp),
          formData.target,
        ],
      });

      console.log("✅ Contract call success", data);
      return data;
    } catch (error) {
      console.log("❌ Contract call failure", error);
      throw error;
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name: nameRef.current?.value || "",
      title: titleRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      target: targetRef.current?.value || "",
      deadline: deadlineRef.current?.value || "",
      image: imageRef.current?.value || "",
    };

    checkIfImage(formData.image, async (exists) => {
      if (exists) {
        try {
          await publishCampaign(formData);
          setIsLoading(false);
          navigate("/");
          toast.success("Campaign created successfully!");
        } catch (error) {
          console.error("Transaction error:", error);
          setIsLoading(false);
          toast.error(
            "Failed to create campaign: " +
              (error instanceof Error ? error.message : String(error))
          );
        }
      } else {
        setIsLoading(false);
        toast.error("Provide a valid image URL");
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] flex justify-center items-center flex-col rounded-[20px] shadow-xl sm:p-12 p-5">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[18px] sm:min-w-[400px] bg-gradient-to-r from-[#3a3a43] to-[#4a4a53] rounded-[15px] shadow-lg mb-2">
        <h1 className="font-epilogue font-bold sm:text-[28px] text-[22px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form onSubmit={submitForm} className="w-full mt-[35px] flex flex-col gap-[35px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Your Name" placeholder="John Doe" inputType="text" value="" refValue={nameRef} />
        </div>

        <FormField labelName="Campaign Title" placeholder="Write a title" inputType="text" value="" refValue={titleRef} />
        <FormField labelName="Story" placeholder="Write your story" isTextArea value="" refValue={descriptionRef} />

        <div className="w-full flex justify-start items-center p-6 bg-gradient-to-r from-[#8c6dfd] to-[#9f7eff] h-[130px] rounded-[15px]">
          <img src={money} alt="money" className="w-[50px] h-[50px] object-contain" />
          <div className="ml-[25px]">
            <h4 className="font-epilogue font-bold text-[26px] text-white">
              You will get 100% of the raised amount
            </h4>
            <p className="font-epilogue text-[14px] text-white/80 mt-1 hidden sm:block">
              No platform fees, all funds go directly to your campaign
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Goal" placeholder="ETH 0.50" inputType="number" value="" refValue={targetRef} />
          <FormField labelName="End Date" placeholder="End Date" inputType="date" value="" refValue={deadlineRef} />
        </div>

        <FormField labelName="Campaign image" placeholder="Place image URL of your campaign" inputType="url" value="" refValue={imageRef} />

        <div className="flex justify-center items-center mt-[45px]">
          <CustomButton
            btnType="submit"
            title="Create Campaign"
            styles="bg-gradient-to-r from-[#1dc071] to-[#2ecc71] min-w-[200px] py-3 px-6"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
