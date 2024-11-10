import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import SelectAddress from "../Components/Checkout/SelectAddress";
import CartPage from "./Cart";

/* icons */
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/Check";

export function Checkout() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="w-full lg:mt-24 md:mt-20 mt-32  mb-5">
      <div className="flex flex-col lg:flex-row mx-auto justify-center">
        <div className="lg:m-2 md:m-0 sm:m-0 w-full lg:w-2/5 shadow-md bg-white">
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-4 border-sky-500 shadow-none rounded-none",
              }}
            >
              <Tab
                key="tab1"
                value="tab1"
                onClick={() => setActiveTab("tab1")}
                className={
                  activeTab === "tab1"
                    ? "text-sky-500 p-4 font-bold"
                    : "p-4 text-slate-400 font-light"
                }
              >
                <span className=" pr-4">
                  <span className="mr-4">CART</span>
                  <ShoppingCartIcon />
                </span>
              </Tab>
              <Tab
                key="tab2"
                value="tab2"
                onClick={() => setActiveTab("tab2")}
                className={
                  activeTab === "tab2"
                    ? "text-sky-500 p-4 font-bold"
                    : "p-4 text-slate-400"
                }
              >
                <span className=" pr-4">
                  <span className="mr-4">DELIVERY</span>
                  <LocalShippingIcon />
                </span>
              </Tab>
              <Tab
                key="tab3"
                value="tab3"
                onClick={() => setActiveTab("tab3")}
                className={
                  activeTab === "tab3"
                    ? "text-sky-500 p-4 font-bold"
                    : "p-4 text-slate-400"
                }
              >
                <span className=" pr-4">
                  <span className="mr-4">CHECKOUT</span>
                  <CheckIcon />
                </span>
              </Tab>
            </TabsHeader>
            <TabsBody className="px-0">
              <TabPanel key="tab1" value="tab1" className="p-0 mx-0">
                <CartPage />
              </TabPanel>
              <TabPanel key="tab2" value="tab2">
                <SelectAddress />
              </TabPanel>
              <TabPanel key="tab3" value="tab3">
                <div className="w-64 h-64 bg-white shadow-sm">
                  <p>Tab3</p>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
        <div className="lg:m-2 md:m-0 md:mt-2 sm:mt-2 min w-full lg:w-96">
          <div className="shadow-md pb-2 bg-white">
            <div className="p-4 text-justify w-full text-lg font-semibold">
              <span className="">PRICE DETAILS</span>
              <hr />
            </div>
            <div className="w-full flex">
              <div className="mx-2 p-2  w-1/2 text-left">
                <span>Price ({0} items)</span>
              </div>
              <div className="mx-2 p-2 w-1/2 text-right">
                <span>₹{0}</span>
              </div>
            </div>
            <div className="w-full flex">
              <div className="mx-2 p-2 w-1/2 text-left">
                <span>Discount</span>
              </div>
              <div className="mx-2 p-2 w-1/2 text-right">
                <span>₹{0}</span>
              </div>
            </div>
            <hr className="mx-2" />
            <div className="w-full flex font-semibold">
              <div className="mx-2 p-2 w-1/2 text-left">
                <span>Total Amount</span>
              </div>
              <div className="mx-2 p-2 w-1/2 text-right">
                <span>₹{0}</span>
              </div>
            </div>
          </div>

          <div className="p-4 ">
            <Button className="w-full">CHECKOUT</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
