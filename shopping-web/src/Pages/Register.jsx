import React, { useState } from "react";
import {
  Stepper,
  Step,
  Typography,
  Tabs,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";

/* Icons */
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FaceIcon from "@mui/icons-material/Face";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ProfileSection from "../Components/Register/Profile";
import VerifySection from "../Components/Register/Verify";
import FinishSection from "../Components/Register/Finish";

const RegisterPage = () => {
  const tabs = ["profile", "verify", "finish"];

  const [profileData, setProfileData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[url('bg/bg10.jpg')] bg-cover bg-center">
      <div className="absolute w-full h-full justify-center backdrop-blur-md"></div>
      <div className="w-full -mt-10 bg-white shadow-md md:w-4/5 lg:w-[80%] p-8 backdrop-blur-lg">
        <Stepper
          className="mx-auto w-4/5"
          activeStep={activeStep}
          activeLineClassName="bg-sky-500"
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step
            className={
              activeStep >= 0
                ? "!bg-sky-500 text-slate-500"
                : "bg-slate-500 text-slate-500"
            }
          >
            <FaceIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className={activeStep >= 0 ? "text-sky-500" : "text-slate-500"}
              >
                PROFILE
              </Typography>
            </div>
          </Step>
          <Step
            className={
              activeStep >= 1 ? "!bg-sky-500 text-slate-500" : " text-slate-500"
            }
          >
            <VerifiedUserIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className={activeStep >= 1 ? "text-sky-500" : "text-slate-500"}
              >
                VERIFY
              </Typography>
            </div>
          </Step>
          <Step
            className={
              activeStep >= 2 ? "!bg-sky-500 text-slate-500" : "text-slate-500"
            }
          >
            <HowToRegIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                className={activeStep >= 2 ? "text-sky-500" : "text-slate-500"}
              >
                FINSH UP
              </Typography>
            </div>
          </Step>
        </Stepper>
        <Tabs value={tabs[activeStep]} className="mt-12">
          <TabsBody>
            <TabPanel
              key="profile"
              value="profile"
              className={
                activeStep === 0 ? "block !opacity-100 !relative" : "hidden"
              }
            >
              <ProfileSection
                setProfileData={setProfileData}
                setActiveStep={setActiveStep}
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
              />
            </TabPanel>
            <TabPanel
              key="verify"
              value="verify"
              className={
                activeStep === 1
                  ? "block !opacity-100 !relative z-10"
                  : "absolute opacitiy-0 !hidden"
              }
            >
              <VerifySection
                sessionId={profileData.sessionId}
                email={profileData.email}
                setActiveStep={setActiveStep}
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
              />
            </TabPanel>
            <TabPanel
              key="finish"
              value="finish"
              className={
                activeStep === 2
                  ? "block !opacity-100 !relative z-20"
                  : "!absolute !opacitiy-0 !hidden"
              }
            >
              <FinishSection
                profileData={profileData}
                setActiveStep={setActiveStep}
                isLastStep={isLastStep}
              />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default RegisterPage;
