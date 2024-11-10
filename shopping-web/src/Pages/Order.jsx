import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

const CartPage = () => {
  const data = {
    productList: [
      {
        title: "Gaming Headphone",
        price: 240.0,
        description: "Table with air purifier, stained venner/black",
        imageUrl: "/images/headphones.jpg",
      },
      {
        title: 'Macbook pro13"',
        price: 1099.0,
        description: "256, 8core GPU, 8GB",
        imageUrl: "/images/macbook.png",
      },
      {
        title: "HomePod mini",
        price: 59.0,
        description: "5 colors available",
        imageUrl: "/images/homepod.jpeg",
      },
      {
        title: "Laptop sleeve macbook",
        price: 59.0,
        description: "Organic Cotton, fairtrade certified",
        imageUrl: "/images/macbook-sleeve.jpg",
      },
      {
        title: 'Macbook pro13"',
        price: 1099.0,
        description: "256, 8core GPU, 8GB",
        imageUrl: "/images/macbook.png",
      },
      {
        title: "HomePod mini",
        price: 59.0,
        description: "5 colors available",
        imageUrl: "/images/homepod.jpeg",
      },
    ],
  };

  return (
    <div className="mx-2 lg:mt-24 md:mt-20 sm:mt-32 mt-32 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm w-1/2 grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
          {data.productList.map((item) => (
            <Card className="rounded-none">
              <CardBody className="md:min-h-64 lg:h-64 hover:cursor-pointer">
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
