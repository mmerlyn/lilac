import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import React from "react";

const OrdersPage = () => {
  return (
    <div>
      <div className="bg-stone-50 lg:mt-24 md:mt-16 mb-5">
        <div className="w-full flex flex-row justify-center">
          <div className="w-1/3 shadow-md">
            <Card className="flex flex-row justify-center rounded-none shadow-none">
              <CardHeader className="flex flex-col justify-center rounded-none shadow-none lg:w-2/5 sm:w-1/5 mt-1 mx-auto">
                <img
                  src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"
                  alt="/"
                  className="object-cover rounded-full"
                />
              </CardHeader>
              <CardBody className="lg:m-2 w-full m-3 flex flex-col justify-center">
                <h3 className="font-bold text-center text-2xl">
                  ORDER HISTORY
                </h3>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="bg-stone-50 mx-auto mb-5">
        <div className="w-full flex flex-row justify-center">
          <div className="w-3/5 shadow-md">
            <Card className="w-full flex flex-row justify-center rounded-none shadow-md mx-auto">
              <CardBody>
                <table className="w-full m-2 border border-separate border-spacing-6 border-slate-100  text-center">
                  <tr>
                    <th>ORDER #</th>
                    <th>DATE</th>
                    <th>SHIP TO</th>
                    <th>ORDER TOTAL</th>
                    <th>ACTION</th>
                  </tr>
                  <tr>
                    <td>WA1002230889</td>
                    <td>2023-08-05 22:06:14</td>
                    <td>Merlyn Mercylona</td>
                    <td>Rs. 1818</td>
                    <td>
                      <Button className="lg:text-sm md:text-sm sm:text-xs">
                        Order Details
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>WA1001793893</td>
                    <td>2023-07-15 01:36:32</td>
                    <td>Merlyn Mercylona</td>
                    <td>Rs. 519</td>
                    <td>
                      <Button className="lg:text-sm md:text-sm sm:text-xs">
                        Order Details
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>WA1001786152</td>
                    <td>2023-07-10 20:19:33</td>
                    <td>Merlyn Mercylona</td>
                    <td>Rs. 479</td>
                    <td>
                      <Button className="lg:text-sm md:text-sm sm:text-xs">
                        Order Details
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>WA1001784883</td>
                    <td>2023-07-10 00:57:48</td>
                    <td>Merlyn Mercylona</td>
                    <td>Rs. 1558</td>
                    <td>
                      <Button className="lg:text-sm md:text-sm sm:text-xs">
                        Order Details
                      </Button>
                    </td>
                  </tr>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
