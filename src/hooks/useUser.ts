import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import loginRequest from "../services/login";
import secureLocalStorage from "react-secure-storage";
import { Role } from "../common/types/user.type";
export default function useUser() {
  const { jwt, setJWT, user, setUser } = useContext(UserContext);
  const login = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      loginRequest({ username, password })
        .then(({ accessToken, user }) => {
          secureLocalStorage.setItem("jwt", accessToken);
          secureLocalStorage.setItem("user", user);
          setUser(user);
          setJWT(accessToken);
        })
        .catch((err) => {
          secureLocalStorage.removeItem("jwt");
          console.error(err);
        });
    },
    [setJWT, setUser]
  );

  const logout = useCallback(() => {
    secureLocalStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);
  return {
    isLoggedIn: Boolean(jwt),
    isAdmin: Boolean(user?.role === Role.ADMIN),
    login,
    logout,
    jwt,
    setJWT,
    setUser
  };
}
