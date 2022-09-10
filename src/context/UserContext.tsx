import { createContext, FC, ReactNode, useState } from "react";
import { UserContextType } from "../common/types/user.type";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

type Props = {
  children?: ReactNode;
};
const UserContextProvider: FC<Props> = ({ children }) => {
  const [jwt, setJWT] = useState<string | null>(() =>
    window.sessionStorage.getItem("jwt")
  );
  return (
    <UserContext.Provider value={{ jwt, setJWT }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
