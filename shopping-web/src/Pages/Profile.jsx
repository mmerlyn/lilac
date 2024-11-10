import { Alert, Button, Card, Input, Spinner } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getprofile } from "../Services/user.service";
import { useAuth } from "../Context/User.context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useAuth();

  const [profile, setProfile] = useState({ address: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      getprofile(token.accessToken, token.idToken)
        .then((response) => {
          if (response.status.error) {
            setError(response.payload.message);
          }
          setProfile(response.payload);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      navigate("/login");
    }
  }, [navigate, token, isLoggedIn]);

  return (
    <div className="w-full lg:mt-24 md:mt-16 mt-28 mb-5">
      <div className={`${error !== "" ? "block" : "hidden"}`}>
        <Alert color="red">An error Occured: {error}</Alert>
      </div>
      {isLoading ? (
        <div className="grid justify-items-center mt-[30vh]">
          <Spinner color="blue" className="h-16 w-16" />
        </div>
      ) : (
        <>
          <div className="w-full  flex flex-col lg:flex-row  justify-center gap-4">
            <div className="w-full bg-white shadow-md md:w-4/5 sm: lg:w-2/5 lg:p-4">
              <div className="p-4">
                <span className="font-bold text-xl">Personal Information</span>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    className="p-2"
                    label="First Name"
                    value={profile.firstName}
                    disabled
                  />
                  <Input
                    className="p-2"
                    label="Last Name"
                    value={profile.lastName}
                    disabled
                  />
                </div>
              </div>
              <div className="p-4">
                <span className="font-bold text-xl">Email Address</span>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    className="p-2"
                    label="Phone Number"
                    value={profile.phoneNumber}
                    disabled
                  />
                </div>
              </div>
              <div className="p-4">
                <span className="font-bold text-xl">Phone Number</span>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    className="p-2"
                    label="Email"
                    value={profile.email}
                    disabled
                  />
                </div>
              </div>
              <div className="p-4">
                <span className="font-bold text-xl">Address(s)</span>
                <Card className="mt-4 h-full w-full overflow-hidden rounded-none shadow-sm border-2">
                  <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                      {profile.address.map(
                        ({ place, locality, city, state, pinCode }, index) => {
                          const isLast = index === profile.address.length - 1;
                          const classes = isLast
                            ? "p-4 overflow-auto"
                            : "p-4 border-b border-blue-gray-50 overflow-auto";

                          return (
                            <tr>
                              <td className={classes}>
                                <p className="font-normal line-clamp-2 truncate overflow-auto">
                                  {`${place}, ${locality}, ${city}, ${state}, ${pinCode}`}
                                </p>
                              </td>

                              <td className={classes}>
                                <Button variant="text" color="blue-gray">
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
            <div className="w-full md:w-4/5 sm: lg:w-1/5 p-4">
              <div className="grid lg:grid-rows-1 lg:grid-flow-row grid-flow-col grid-rows-2 gap-4">
                <a className="px-24  py-12 bg-teal-500" href="cart">
                  TEST
                </a>
                <a className="px-24  py-12 bg-teal-500" href="cart">
                  TEST
                </a>
                <a className="px-24  py-12 bg-teal-500" href="cart">
                  TEST
                </a>
                <a className="px-24  py-12 bg-teal-500" href="cart">
                  TEST
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
