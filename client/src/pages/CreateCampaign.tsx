import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import toast from "react-hot-toast";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

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

    setForm(formData);
    checkIfImage(formData.image, async (exists) => {
      if (exists) {
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18).toString(),
        });
        setIsLoading(false);
        navigate("/");
        toast.success("Campaign created successfully!");
      } else {
        setIsLoading(false);
        toast.error("Provide a valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <div className="bg-gradient-to-br from-[#1c1c24] to-[#2c2c34] flex justify-center items-center flex-col rounded-[20px] shadow-xl sm:p-12 p-5 transition-all duration-300 hover:shadow-2xl border border-[#3a3a43]/30">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[18px] sm:min-w-[400px] bg-gradient-to-r from-[#3a3a43] to-[#4a4a53] rounded-[15px] shadow-lg transform transition-transform hover:scale-[1.01] mb-2">
        <h1 className="font-epilogue font-bold sm:text-[28px] text-[22px] leading-[38px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4c4cc]">
          Start a Campaign
        </h1>
      </div>

      <p className="text-[#a8a8b3] text-center max-w-[600px] mt-3 mb-6 font-epilogue">
        Create your campaign and start raising funds for your amazing idea. Fill
        in the details below to get started.
      </p>

      <form
        onSubmit={submitForm}
        className="w-full mt-[35px] flex flex-col gap-[35px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            refValue={nameRef}
          />
        </div>
        <FormField
          labelName="Campaign Title"
          placeholder="Write a title"
          inputType="text"
          value={form.title}
          refValue={titleRef}
        />

        <FormField
          labelName="Story"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          refValue={descriptionRef}
        />

        <div className="w-full flex justify-start items-center p-6 bg-gradient-to-r from-[#8c6dfd] to-[#9f7eff] h-[130px] rounded-[15px] shadow-lg transform transition-transform hover:translate-y-[-3px] hover:shadow-xl">
          <img
            src={money}
            alt="money"
            className="w-[50px] h-[50px] object-contain filter drop-shadow-lg animate-pulse"
          />
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
          <FormField
            labelName="Goal"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            refValue={targetRef}
          />
          <FormField
            labelName="End Date"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            refValue={deadlineRef}
          />
        </div>

        <FormField
          labelName="Campaign image"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          refValue={imageRef}
        />

        <div className="flex justify-center items-center mt-[45px]">
          <CustomButton
            btnType="submit"
            title="Create Campaign"
            styles="bg-gradient-to-r from-[#1dc071] to-[#2ecc71] min-w-[200px] py-3 px-6 transition-all duration-300 hover:opacity-90 hover:shadow-lg transform hover:scale-[1.02]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
