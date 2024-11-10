import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";

import React, { useState } from "react";

const SideBar = () => {
  const [isOpen, setOpen] = useState(true);
  const Toggle = () => {
    const val = !isOpen;
    setOpen(val);
  };

  return (
    <React.Fragment>
      <aside
        className={`bg-zinc-50 z-10  shadow-lg p-5  min-h-[calc(100vh)] w-72 transition-transform duration-300 ${
          isOpen
            ? "absolute sm:absolute md:relative lg:relative"
            : "-translate-x-full absolute"
        }`}
      >
        <div className={`relative sm:block border-white/20`}>
          <button onClick={Toggle} className="p-2">
            <CloseIcon />
          </button>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <KeyboardArrowDownIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <KeyboardArrowDownIcon className="h-5 w-5" />
            </ListItemPrefix>
            E-Commerce
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <KeyboardArrowDownIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <KeyboardArrowDownIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <KeyboardArrowDownIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <KeyboardArrowDownIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </aside>
      <div className="">
        {isOpen ? null : (
          <button className="p-6" onClick={Toggle}>
            <TuneIcon />
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default SideBar;
