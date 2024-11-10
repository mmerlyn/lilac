import React from "react";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const WishListPage = () => {
  const data = {
    title: "Electronics for you",
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
      {
        title: "Laptop sleeve macbook",
        price: 59.0,
        description: "Organic Cotton, fairtrade certified",
        imageUrl: "/images/macbook-sleeve.jpg",
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
        title: "Laptop sleeve macbook",
        price: 59.0,
        description: "Organic Cotton, fairtrade certified",
        imageUrl: "/images/macbook-sleeve.jpg",
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
    ],
  };

  /*  */

  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-screen bg-gray-100 lg:mt-20 md:mt-16 sm:mt-28 mt-28">
      <main className="flex-2 w-full items-center mx-auto bg-stone-50">
        <div className="w-full grid gap-y-5 gap-x-5 md:grid-cols-3 xl:grid-cols-5 p-4 mb-5">
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
        <div className="mx-auto p-5 justify-center flex items-center gap-4">
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center  gap-2 rounded-full"
            onClick={prev}
            disabled={active === 1}
          >
            <WestIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-1">
            <IconButton {...getItemProps(1)}>1</IconButton>
            <IconButton {...getItemProps(2)}>2</IconButton>
            <IconButton {...getItemProps(3)}>3</IconButton>
            <IconButton {...getItemProps(4)}>4</IconButton>
            <IconButton {...getItemProps(5)}>5</IconButton>
          </div>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2 rounded-full"
            onClick={next}
            disabled={active === 5}
          >
            Next
            <EastIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default WishListPage;
