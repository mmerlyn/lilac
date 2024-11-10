import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { getSearchProduct } from "../Services/product.service";

import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const MAX_PAGE_BUTTONS = 10;
const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [active, setActive] = useState(parseInt(query.get("page")));
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const setNumber = Math.ceil(
    parseInt(query.get("page")) / MAX_PAGE_BUTTONS - 1
  );

  const setStartNumber = setNumber * MAX_PAGE_BUTTONS + 1;

  const {
    title,
    page: pageNumber,
    size,
  } = {
    title: query.get("title"),
    page: parseInt(query.get("page")),
    size: query.get("size"),
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    className: "rounded-full",
  });

  const nextButtonClick = () => {
    if (active === data.pageInfo.totalPages) return;
    setActive(active + 1);
    navigate(
      `/search?title=${query.get("title")}&page=${
        parseInt(active) + 1
      }&size=${query.get("size")}`
    );
  };

  const prevButtonClick = () => {
    if (active === 1) return;
    setActive(active - 1);
    navigate(
      `/search?title=${query.get("title")}&page=${
        parseInt(active) - 1
      }&size=${query.get("size")}`
    );
  };

  const JumptoPage = (event) => {
    const nextPageNumber = parseInt(event.currentTarget.value);
    setSearchInfo({
      title,
      page: nextPageNumber,
      size,
    });
    setActive(parseInt(event.currentTarget.value));
    navigate(`/search?title=${title}&page=${nextPageNumber}&size=${size}`);
  };

  const showNextSet = () => {
    const nextPageNo = (setNumber + 1) * MAX_PAGE_BUTTONS + 1;

    if (active >= data.pageInfo.totalPages) return;
    setActive(nextPageNo);
    navigate(
      `/search?title=${query.get("title")}&page=${nextPageNo}&size=${query.get(
        "size"
      )}`
    );
  };

  const showPrevSet = () => {
    const prevPageNo = (setNumber - 1) * MAX_PAGE_BUTTONS + 1;

    if (active < 1) return;
    setActive(prevPageNo);
    navigate(
      `/search?title=${query.get("title")}&page=${prevPageNo}&size=${query.get(
        "size"
      )}`
    );
  };

  const setSearchInfo = (newSearchInfo) => {
    setQuery(
      `?title=${newSearchInfo.title}&page=${newSearchInfo.page}&size=${newSearchInfo.size}`
    );
  };

  useEffect(() => {
    getSearchProduct(title, pageNumber, size).then((response) => {
      setData(response);
      setIsLoading(false);
    });
  }, [title, pageNumber, size]);

  const renderItems = () => {
    return data.payload.map((item) => (
      <Card key={item.productId} className="rounded-none">
        <CardBody className="grid md:min-h-64 lg:h-64 hover:cursor-pointer justify-items-center">
          <img src={item.imageUrl} alt="" className="h-60 max-w-60" />
        </CardBody>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography
              color="gray"
              className="text-clip font-medium w-[70%] overflow-hidden"
            >
              {item.title}
            </Typography>
            <Typography color="gray" className="font-medium">
              ₹ {item.listPrice}
            </Typography>
          </div>
        </CardBody>
      </Card>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-screen bg-gray-100 lg:mt-20 md:mt-16 sm:mt-28 mt-28">
      <main className="flex-2 w-full items-center mx-auto bg-stone-50">
        {isLoading ? (
          <div className="grid justify-items-center mt-[30vh]">
            <Spinner color="blue" className="h-16 w-16" />
          </div>
        ) : (
          <>
            <div className="w-full grid gap-y-5 gap-x-5 md:grid-cols-3 xl:grid-cols-5 p-4 mb-5">
              {renderItems()}
            </div>
            <div className="mx-auto p-5 justify-center flex items-center gap-4">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center  gap-2 rounded-full"
                onClick={prevButtonClick}
                disabled={active === 1}
              >
                <WestIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>

              <div className="flex items-center gap-1">
                {active > MAX_PAGE_BUTTONS ? (
                  <IconButton onClick={showPrevSet} {...getItemProps({})}>
                    ...
                  </IconButton>
                ) : (
                  <></>
                )}
                {Array.from(
                  {
                    length: Math.min(
                      data.pageInfo.totalPages,
                      MAX_PAGE_BUTTONS
                    ),
                  },
                  (_, index) => {
                    if (setStartNumber + index <= data.pageInfo.totalPages) {
                      return (
                        <IconButton
                          {...getItemProps(setStartNumber + index)}
                          onClick={JumptoPage}
                          key={setStartNumber + index}
                          value={setStartNumber + index}
                        >
                          {setStartNumber + index}
                        </IconButton>
                      );
                    }
                    return null;
                  }
                )}
                {data.pageInfo.totalPages > MAX_PAGE_BUTTONS &&
                setStartNumber + MAX_PAGE_BUTTONS <=
                  data.pageInfo.totalPages ? (
                  <IconButton onClick={showNextSet} {...getItemProps({})}>
                    ...
                  </IconButton>
                ) : (
                  <></>
                )}
              </div>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2 rounded-full"
                onClick={nextButtonClick}
                disabled={active === data.pageInfo.totalPages}
              >
                Next
                <EastIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
