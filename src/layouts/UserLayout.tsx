import { AppBar, Button, Container, Link, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import useUser from "../hooks/useUser";
import { ReactNode } from "react";
const UserLayout = ({ children }: { children: ReactNode }) => {
    const { logout, isAdmin } = useUser();
    return (
        <>
            <AppBar
                position="relative"
                color="default"
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="primary" noWrap>
                        Inteligencia comercial
                    </Typography>
                </Toolbar>
                <Toolbar>
                    <Link href="/dashboard">Dashboard</Link>
                </Toolbar>
                {
                    isAdmin &&
                    <Toolbar>
                        <Link href="/users">Usuarios</Link>
                    </Toolbar>
                }
                <Toolbar>
                    <Button
                        color="secondary"
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        onClick={logout}
                    >
                        Cerrar sesion
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    )
}

export default UserLayout;