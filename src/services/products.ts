const ENDPOINT = import.meta.env.VITE_API_URL;
import secureLocalStorage from "react-secure-storage";
export const downloadCSVProducts = ({
  dateStart,
  dateEnd,
}: {
  dateStart: string;
  dateEnd: string;
}) => {
  return fetch(`${ENDPOINT}/products/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ dateStart, dateEnd }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error in download file");
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const getCountProducts = () => {
  return fetch(`${ENDPOINT}/products/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error in count products");
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const getLastUpdate = () => {
  return fetch(`${ENDPOINT}/scrapper`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error in last update scrapper");
      return res.json();
    })
    .then((data) => {
      return data;
    });
};
