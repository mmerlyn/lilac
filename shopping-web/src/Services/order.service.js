import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_ORDER_API_HOST}/order`,
});

export async function getCart(userId) {
  try {
    const response = await instance.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
