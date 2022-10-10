import { useCallback, useEffect, useState } from "react"
import { IUser } from "../common/types/user.type"
import useFetch from "./useFetch"

export default function useFetchUsers() {
    const fetch = useFetch()
    const [users, setUsers] = useState<IUser[]>([])

    const fetchUsers = useCallback(async () => {
        const res = await fetch('/users', { headers: { "Content-Type": "application/json" }, });
        setUsers(res?.data.data)
    }, [setUsers])

    const addUser = useCallback(async (payload: IUser) => {
        const res = await fetch('/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res) {
            return;
        }
        setUsers((prev) => {
            return [...prev, res.data.data];
        });
    }, [setUsers])

    const editUser = useCallback(async (payload: IUser) => {
        const res = await fetch('/users', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        if (!res) {
            return;
        }
        setUsers((prev) => {
            const users = [...prev];
            const index = users.findIndex(value => value._id === res.data.data._id);
            users[index] = res.data.data;
            return users;
        })
    }, [setUsers])

    const removeUser = useCallback(async (id: string) => {
        const res = fetch(`/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!res) {
            return;
        }
        setUsers((prev) => prev.filter((user) => user._id !== id));
    }, [setUsers])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return {
        users,
        addUser,
        editUser,
        removeUser
    }
}