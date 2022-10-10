import secureLocalStorage from "react-secure-storage";
import { IUser } from "../common/types/user.type";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const getUsers = () => {
    return fetch(`${ENDPOINT}/users`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
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
}

export const saveUser = (data: IUser) => {
    return fetch(`${ENDPOINT}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(data)
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
}

export const updateUser = (data: IUser) => {
    return fetch(`${ENDPOINT}/users`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(data)
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
}

export const deleteUser = (id: string) => {
    return fetch(`${ENDPOINT}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secureLocalStorage.getItem("jwt")}`,
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
}