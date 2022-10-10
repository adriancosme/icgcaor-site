import { createContext, FC, ReactNode, useState } from "react";
import { IUser, UserContextType } from "../common/types/user.type";
import secureLocalStorage from "react-secure-storage";
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

type Props = {
  children?: ReactNode;
};
const UserContextProvider: FC<Props> = ({ children }) => {
  const [jwt, setJWT] = useState<string | null>(() => secureLocalStorage.getItem('jwt'));
  const [user, setUser] = useState<IUser | null>(() => secureLocalStorage.getItem('user'));
  return (
    <UserContext.Provider value={{ jwt, setJWT, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
