import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Redirect } from "wouter";
import { IUser } from "../common/types/user.type";
import { ModalEditUser } from "../components/users/ModalEditUser";
import { ModalNewUser } from "../components/users/ModalNewUser";
import useFetchUsers from "../hooks/useFetchUsers";
import useUser from "../hooks/useUser";
import UserLayout from "../layouts/UserLayout";

const Users = () => {
    const { isLoggedIn, isAdmin } = useUser()
    const { users, removeUser, addUser, editUser } = useFetchUsers();

    const [openNewUser, setOpenNewUser] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);

    const [editedUser, setEditedUser] = useState<IUser>({} as IUser);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    if (!isAdmin) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <>
            <UserLayout>
                <Typography variant="h4" fontWeight={500}>
                    Gestion de usuarios
                </Typography>
                <Box
                    component="div"
                    sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}
                >
                    <Box component="div">
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ mr: "1.5rem" }}
                            onClick={() => setOpenNewUser(true)}
                        >
                            Agregar enlace
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mt: "1rem" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.username}
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                                        {user.role}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                if (user._id) {
                                                    setEditedUser(user);
                                                    setOpenEditUser(true);
                                                }
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => (user._id ? removeUser(user._id) : null)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </UserLayout>
            {
                openNewUser &&
                <ModalNewUser
                    open={openNewUser}
                    handleClose={() => setOpenNewUser(false)}
                    addUser={addUser}
                />
            }
            {
                openEditUser &&
                <ModalEditUser
                    open={openEditUser}
                    handleClose={() => {
                        setOpenEditUser(false);
                        setEditedUser({} as IUser);
                    }}
                    editUser={editUser}
                    user={editedUser}
                />
            }
        </>
    )
}

export default Users;