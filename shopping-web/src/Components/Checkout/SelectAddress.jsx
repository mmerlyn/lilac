import {
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const SelectAddress = () => {
  const Address = [
    {
      addressId: "1",
      address:
        "LADIES HOSTEL , CHAMRAJNAGAR INSTITUTE OF MEDICAL SCIENCE (CIMS) , Yadapura Village, Chamrajnagar District., Yelahanka, SIDCO Industrial Estate Badanguppe Kellambali, Karnataka ",
    },
    {
      addressId: "2",
      address:
        "Kalash happy Stay Ladies PG, Sharadha Nagar, Udaya Layout, Yelahanka Newtown,, Yelahanka NewTown, Bengaluru, Karnataka",
    },
    {
      addressId: "3",
      address:
        "House No 60. 5th Cross, Gundappa Road, Opp Road to Govt School, Nagenahalli, Yelahanka, Nagenahalli, Yelahanka, Bengaluru, Karnataka",
    },
  ];
  return (
    <div>
      {Address.map((item) => (
        <List className="p-2">
          <ListItem className="p-0">
            <label
              htmlFor={item.addressId}
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Radio
                  name="vertical-list"
                  id={item.addressId}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-2",
                  }}
                ></Radio>
              </ListItemPrefix>
              <p className="p-2">{item.address}</p>
            </label>
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default SelectAddress;
