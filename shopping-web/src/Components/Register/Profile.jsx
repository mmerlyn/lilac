import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import Select from "react-select";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { signupInit } from "../../Services/user.service";
import { useState } from "react";

const ProfileSection = ({ setProfileData, setActiveStep, isLastStep }) => {
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const stateList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const Init = async (data) => {
    try {
      const response = await signupInit(data.email);
      if (response.status.error === false) {
        setError("");
        setProfileData({ ...data, sessionId: response.payload.sessionId });
        handleNext();
      } else {
        setError(response.status.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  /* move to next tab */
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };

  /* styling for the list selection component */
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: errors.selectedState ? "red" : "",
    }),
  };

  return (
    <React.Fragment>
      <div className={`${error !== "" ? "block" : "hidden"}`}>
        <Alert color="red">An error Occured: {error}</Alert>
      </div>

      <div className="p-2 mb-4">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
      </div>
      <div className="grid gap-y-2  gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <Input
          color="blue"
          label="First name"
          {...register("firstName", { required: true })}
          error={errors.firstName ? true : false}
        />

        <Input
          color="blue"
          label="Last name"
          {...register("lastName", { required: true })}
          error={errors.lastName ? true : false}
        />
      </div>
      <div className="grid my-4 gap-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <Input
          color="blue"
          label="Email"
          {...register("email", { required: true })}
          error={errors.email ? true : false}
        />
        <Input
          color="blue"
          label="Phone Number"
          {...register("phoneNumber", { required: true })}
          error={errors.phoneNumber ? true : false}
        />
      </div>
      <div className="grid my-4 gap-4  grid-cols-1">
        <Input
          color="blue"
          label="Address"
          {...register("address", { required: true })}
          error={errors.address ? true : false}
        />
      </div>
      <div className="grid my-4 gap-4   grid-rows-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-rows-2 lg:grid-cols-2">
        <Input
          color="blue"
          label="Locality"
          {...register("locality", { required: true })}
          error={errors.locality ? true : false}
        />
        <Input
          color="blue"
          label="City"
          {...register("city", { required: true })}
          error={errors.city ? true : false}
        />
        <Controller
          {...register("selectedState", { required: true })}
          name="selectedState"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select State"
              styles={customStyles}
              options={stateList.map((item) => {
                return { value: item, label: item };
              })}
            />
          )}
        />

        <Input
          className="remove-arrow"
          type="number"
          color="blue"
          label="Pincode"
          {...register("pincode", { required: true, maxLength: 6 })}
          error={errors.pincode ? true : false}
        />
      </div>
      <div className="flex justify-center gap-6 p-4">
        <Button
          color="blue"
          onClick={handleSubmit((data) => {
            Init(data);
          })}
          disabled={isLastStep}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ProfileSection;
