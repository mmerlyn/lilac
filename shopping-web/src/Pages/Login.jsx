import React, { useEffect } from "react";
import {
  Card,
  Typography,
  CardFooter,
  Button,
  CardBody,
  Input,
  Alert,
} from "@material-tailwind/react";
import { userLogin } from "../Services/user.service";
import { makeUserLoggedIn, useAuth } from "../Context/User.context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  if (isLoggedIn) {
    return null;
  }

  const redirectUrl = query.get("redirect");

  const Login = async (data) => {
    try {
      const response = await userLogin(data.email, data.password);

      if (response.status.error === false) {
        await makeUserLoggedIn(response.payload);

        if (redirectUrl === null || redirectUrl === undefined) {
          navigate("/");
        } else {
          navigate(`/${redirectUrl}`);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-stone-200">
      <div className="container max-w-md mt-[20vh] mx-auto p-4">
        <Card className="w-96">
          <div className={`${error !== "" ? "block" : "hidden"}`}>
            <Alert color="red">An error Occured: {error}</Alert>
          </div>
          <div className="w-full items-center">
            <h4 className="w-full text-center p-4 font-semibold">
              LOGIN TO CONTINUE
            </h4>
          </div>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              color="blue"
              label="Email"
              {...register("email", { required: true })}
              error={errors.email ? true : false}
              className="remove-arrow"
            />
            <Input
              type="password"
              color="blue"
              label="Password"
              {...register("password", { required: true })}
              error={errors.password ? true : false}
              className="remove-arrow"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              color="blue"
              onClick={handleSubmit((data) => {
                Login(data);
              })}
              fullWidth
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
