import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import loginRequest from "../services/login";
export default function useUser() {
  const { jwt, setJWT } = useContext(UserContext);
  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      loginRequest({ email, password })
        .then((accessToken) => {
          window.sessionStorage.setItem("jwt", accessToken);
          setJWT(accessToken);
        })
        .catch((err) => {
          window.sessionStorage.removeItem("jwt");
          console.error(err);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    setJWT(null);
    window.sessionStorage.removeItem("jwt");
  }, [setJWT]);
  return {
    isLoggedIn: Boolean(jwt),
    login,
    logout,
  };
}
