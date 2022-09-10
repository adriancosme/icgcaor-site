import { Dispatch, SetStateAction } from "react";

export type UserContextType = {
  jwt: string| null;
  setJWT: Dispatch<SetStateAction<string | null>>;
};
