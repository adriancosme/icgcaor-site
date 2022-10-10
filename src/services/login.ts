import { IUser } from "../common/types/user.type";

const ENDPOINT = import.meta.env.VITE_API_URL;
export default function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return fetch(`${ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error in login");
      return res.json();
    })
    .then((data) => {
      const {
        data: { accessToken, user },
      } = data;
      return { accessToken, user };
    });
}
