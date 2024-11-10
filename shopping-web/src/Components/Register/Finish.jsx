import { Button, Input, Typography, Alert } from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../../Services/user.service";
import { useNavigate } from "react-router-dom";
import { makeUserLoggedIn } from "../../Context/User.context";

const FinishSection = ({ profileData, isFirstStep, setActiveStep }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
  };

  const SignUp = async (data) => {
    try {
      const response = await signup({
        ...profileData,
        password: data.password,
      });

      if (response.status.error === false) {
        await makeUserLoggedIn(response.payload);
        navigate(`/`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className={`${error !== "" ? "block" : "hidden"}`}>
        <Alert color="red">An error Occured: {error}</Alert>
      </div>
      <div className="p-2 mb-4">
        <Typography variant="h4" color="blue-gray">
          Setup Password
        </Typography>
        <Typography color="gray" className="mt-1 font-normal"></Typography>
      </div>
      <div className="grid grid-cols-1 gap-y-4 grid-row-2">
        <Input
          type="password"
          color="blue"
          label="Password"
          {...register("password", { required: true })}
          error={errors.password ? true : false}
          className="remove-arrow"
        />
        <Input
          type="password"
          color="blue"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (val) => {
              if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
          error={errors.confirmPassword ? true : false}
          className="remove-arrow"
        />
      </div>
      <div className="flex justify-center gap-6 p-4">
        <Button color="grey" onClick={handlePrev}>
          Back
        </Button>
        <Button
          color="blue"
          onClick={handleSubmit((data) => {
            SignUp(data);
          })}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
};

export default FinishSection;
