import React from "react";
import { CardBody, CardFooter } from "@material-tailwind/react";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductList = ({ data }) => {
  const navigate = useNavigate();

  const ProductPage = () => {
    navigate("/product");
  };

  return (
    <div className="flex  relative overscroll-x-contain overflow-auto">
      <div className="snap-x w-full flex gap-8 scroll-pl-6 overflow-x-auto py-5">
        {data.map((item) => (
          <Card className="w-64 h-auto lg:w-80 lg:h-auto md:h-auto md:w-72 snap-center shrink-0 shadow-xl">
            <CardBody
              onClick={ProductPage}
              className="h-36 md:h-36 lg:h-64 hover:cursor-pointer"
            >
              <img src={item.imageUrl} alt="" />
            </CardBody>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="gray" className="font-medium">
                  {item.title}
                </Typography>
                <Typography color="gray" className="font-medium">
                  {item.price}
                </Typography>
              </div>
              <p className="mt-4 truncate text-sm text-slate-400 opacity-75 font-sans">
                {item.description}
              </p>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={ProductPage}
                ripple={false}
                fullWidth={true}
                variant="outlined"
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
