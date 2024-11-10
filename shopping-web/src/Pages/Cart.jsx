import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "@material-tailwind/react";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { getCart } from "../Services/order.service";
import { useAuth } from "../Context/User.context";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const { isLoggedIn, userId } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      getCart(userId)
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      navigate("/login?redirect=cart");
    }
  }, [isLoggedIn, navigate, userId]);

  return (
    <div className="w-full  lg:px-8 mx-0 mt-6">
      {error !== "" ? (
        <Alert color="red">An error Occured: {error}</Alert>
      ) : (
        <div className="flex flex-col lg:flex-row mx-auto justify-center">
          {isLoading ? (
            <div className="grid justify-items-center mt-[30vh]">
              <Spinner color="blue" className="h-16 w-16" />
            </div>
          ) : (
            <div>
              {data.payload.productList.map((item) => (
                <div id={item.id} className="mb-4 last:mb-0 ">
                  <Card className="rounded-none shadow-none flex-row">
                    <CardHeader
                      shadow={false}
                      floated={false}
                      className="p-2 max-h-48 w-[30%] shrink-0 rounded-none"
                    >
                      <img
                        src={item.imageUrl}
                        alt="/"
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="w-full">
                      <p className="lg:text-xl md:text-lg mb-2 sm:text-sm">
                        {item.title}
                      </p>
                      <p className="mt-4 text-sm text-slate-400 opacity-75 font-sans">
                        {item.description}
                      </p>

                      <span className="text-sm line-through text-slate-400 opacity-75 font-sans">
                        ₹{item.listPrice}
                      </span>
                      <span className="px-4 font-semibold text-base">
                        ₹{item.listPrice - item.discount}
                      </span>
                    </CardBody>
                  </Card>
                  <div className="flex md:ml-6 lg:ml-6  p-4 ml-0 sm:p-2 w-full">
                    <div className="w-24">
                      <div class="flex items-center border border-gray-200 rounded">
                        <Button
                          variant="text"
                          color="gray"
                          className="p-1 h-10"
                          disabled={item.quantity <= 1 ? true : false}
                        >
                          <RemoveIcon />
                        </Button>
                        <input
                          type="number"
                          value={item.quantity}
                          id={item.id}
                          class="h-10 w-8 border-transparent text-center  sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                          variant="text"
                          color="gray"
                          className="p-1 h-10"
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="text"
                      color="gray"
                      className="mx-1 disabled"
                    >
                      ADD TO WISHLIST
                    </Button>
                    <Button variant="text" color="gray" className="">
                      REMOVE
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
