import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signupVerify } from "../../Services/user.service";

const VerifySection = ({
  sessionId,
  email,
  isLastStep,
  isFirstStep,
  setActiveStep,
}) => {
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
  };

  const Verify = async (data) => {
    try {
      if (sessionId === undefined || email === undefined) {
        setError(`Paramter missing`);
      }
      const response = await signupVerify(sessionId, data.otp);
      if (response.status.error === false && response.payload.verified) {
        setError("");
        handleNext();
      } else {
        setError(response.status.message);
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
          Verify One time Password
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the code sent to {email}.
        </Typography>
      </div>
      <div className="grid grid-cols-1 ">
        <Input
          type="number"
          color="blue"
          label="Code"
          {...register("otp", { required: true })}
          error={errors.otp ? true : false}
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
            Verify(data);
          })}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
};

export default VerifySection;
