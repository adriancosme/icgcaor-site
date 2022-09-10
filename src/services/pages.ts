import { ApiResponse } from "../common/interfaces/ApiResponse";
import { Page } from "../common/types/page.type";

const ENDPOINT = "http://localhost:3000";
export const getPages = () => {
  return fetch(`${ENDPOINT}/pages`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error getting pages");
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const savePage = (data: Page): Promise<ApiResponse<Page>> => {
  return fetch(`${ENDPOINT}/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("There an error getting pages");
      return res.json();
    })
    .then((data) => {
      return data;
    });
};
