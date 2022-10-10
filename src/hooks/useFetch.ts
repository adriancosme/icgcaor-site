import useUser from "./useUser"
import secureLocalStorage from "react-secure-storage";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { IUser } from "../common/types/user.type";

export interface JwtDecodeType extends IUser {
    exp: number;
    iat: number;
}

export default function useFetch() {

    const { jwt, setJWT, setUser } = useUser()

    const ENDPOINT = import.meta.env.VITE_API_URL;

    let originalRequest = async (url: RequestInfo | URL, config: RequestInit | undefined) => {
        url = `${ENDPOINT}${url}`
        let response = await fetch(url, {...config})
        let data = await response.json()
        return { response, data }
    }

    let refreshToken = async (token: string) => {
        let response = await fetch(`${ENDPOINT}/auth/renew-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': token })
        })
        let data = await response.json()
        secureLocalStorage.setItem("jwt", data.data.accessToken);
        secureLocalStorage.setItem("user", data.data.user);
        setUser(data.data.accessToken);
        setJWT(data.data.accessToken);
        return data
    }

    let callFetch = async (url: RequestInfo | URL, config: RequestInit | undefined = {}) => {        
        if (!jwt) {
            return;
        }
        const user = jwt_decode(jwt) as JwtDecodeType;
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (isExpired) {
            await refreshToken(jwt);
        }

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${jwt}`
        }

        let { response, data } = await originalRequest(url, config)
        return { response, data }
    }

    return callFetch
}