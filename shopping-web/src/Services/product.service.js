import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PRODUCT_API_HOST}/product`,
});

export async function getSearchProduct(title, page, size) {
  try {
    const response = await instance.get(
      `/search?title=${title}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function getProduct(userId, productId) {
  try {
    const response = await instance.get(`/info/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    throw new error(error.message);
  }
}
