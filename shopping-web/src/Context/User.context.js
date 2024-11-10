import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { getprofile } from "../Services/user.service";

const UserContext = createContext({});

export function useAuth() {
  return useContext(UserContext);
}

export async function makeUserLoggedIn({
  accessToken,
  idToken,
  refreshToken,
  expiryIn,
}) {
  try {
    const maxExpiry = +new Date() + 1000 * expiryIn;
    /* Save token */
    Cookies.set("accessToken", accessToken, { expires: 1 });
    Cookies.set("idToken", idToken, { expires: 1 });
    Cookies.set("refreshToken", refreshToken, { expires: 1 });
    Cookies.set("expiryIn", expiryIn, { expires: 1 });
    Cookies.set("maxExpiry", maxExpiry, { expires: 30 });
    /* Get Profile API */
    const response = await getprofile(accessToken, idToken);

    if (response.status.error === false) {
      Cookies.set("userId", response.payload.userId, { expires: 1 });
      Cookies.set("profile", JSON.stringify(response.payload));
    } else {
      throw new Error(`Fetching Profile Failed`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export function AuthProvider(props) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLogged] = useState(false);

  const maxExpiry = Cookies.get("maxExpiry");

  if (!isLoggedIn) {
    if (+new Date() < maxExpiry) {
      if (+new Date() > maxExpiry - 3600 * 1000) {
        // refresh token
        // update the cookies
      } else {
        const accessToken = Cookies.get("accessToken");
        const idToken = Cookies.get("idToken");
        const refreshToken = Cookies.get("refreshToken");

        setToken({
          accessToken,
          idToken,
          refreshToken,
        });
      }
      const cookie_userId = Cookies.get("userId");
      const cookie_user = Cookies.get("profile");
      setIsLogged(true);
      setUserId(cookie_userId);
      setUser(JSON.parse(cookie_user));
    }
  }

  const value = {
    token,
    setToken,
    user,
    setUser,
    isLoggedIn,
    setIsLogged,
    userId,
    setUserId,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
