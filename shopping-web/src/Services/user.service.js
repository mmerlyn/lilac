import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_USER_API_HOST}/user`,
});

export async function signupInit(email) {
  let response;
  try {
    const params = {
      email,
    };
    response = await instance.post("/signup/init", params);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signupVerify(sessionId, otp) {
  try {
    const body = {
      sessionId,
      otp,
    };
    const response = await instance.post("/signup/verify", body);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signup({
  sessionId,
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
}) {
  try {
    const body = {
      sessionId,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    };
    const response = await instance.post("/signup", body);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getprofile(accessToken, idToken) {
  try {
    const config = {
      headers: { Authorization: accessToken, idToken: idToken },
    };

    console.log(accessToken, idToken);
    const response = await instance.get("/profile", config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function userLogin(email, password) {
  try {
    const body = {
      email,
      password,
    };
    const response = await instance.post("/login", body);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
