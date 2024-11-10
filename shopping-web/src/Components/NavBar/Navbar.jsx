import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavbarWithSearch = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const searchTextHandle = (event) => {
    setSearchText(event.target.value);
  };

  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <div className="m-0 max-h-[768px] border-none  w-[calc(100%)]">
      <Navbar className="shadow-md border-none  fixed z-20 top-0 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex  flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Shopping hub
          </Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <IconButton
              onClick={() => {
                navigate("/cart");
              }}
              variant="text"
              color="blue-gray"
            >
              <ShoppingCartOutlinedIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/wishlist");
              }}
              variant="text"
              color="blue-gray"
            >
              <FavoriteBorderOutlinedIcon className="h-4 w-4" />
            </IconButton>

            <ProfileMenu />
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20"
              value={searchText}
              onChange={searchTextHandle}
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              onClick={() => {
                navigate(`/search?title=${searchText}&page=1&size=20`);
              }}
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarWithSearch;
