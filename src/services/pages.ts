import { ApiResponse } from "../common/interfaces/ApiResponse";
import { Page } from "../common/types/page.type";

const ENDPOINT = import.meta.env.VITE_API_URL;
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
  }).then(async (res) => {
    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await res.json() : null;
    if (!res.ok) {
      const error = (data && data.message) || res.status;
      return Promise.reject(error);
    }
    return await data;
  });
};

export const updatePage = (data: Page): Promise<ApiResponse<Page>> => {
  return fetch(`${ENDPOINT}/pages/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await res.json() : null;
    if (!res.ok) {
      const error = (data && data.message) || res.status;
      return Promise.reject(error);
    }
    return await data;
  });
}; 

export const deletePage = (id: string): Promise<ApiResponse<Page>> => {
  return fetch(`${ENDPOINT}/pages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
    },
  }).then(async (res) => {
    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await res.json() : null;
    if (!res.ok) {
      const error = (data && data.message) || res.status;
      return Promise.reject(error);
    }
    return await data;
  });
};
