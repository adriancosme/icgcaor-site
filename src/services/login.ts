const ENDPOINT = "http://localhost:3000";

export default function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return fetch(`${ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error in login");
      return res.json();
    })
    .then((data) => {
      const {
        data: { accessToken },
      } = data;
      return accessToken;
    });
}
