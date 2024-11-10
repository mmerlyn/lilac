import React from "react";
import ProductList from "./ProductList";

const SectionList = () => {
  const sectionList = [
    {
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
      ],
    },
    {
      title: "Items you might like",
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
      ],
    },
  ];

  return (
    <section>
      {sectionList.map((item) => (
        <div className=" ">
          <h3 className="py-2 mt-2 font-sans uppercase text-zinc-500 text-xl font-semibold">
            {item.title}
          </h3>
          <div className="flex flex-row content-center">
            <ProductList data={item.productList} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default SectionList;
