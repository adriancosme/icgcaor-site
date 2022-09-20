import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "wouter";
import useUser from "../hooks/useUser";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { isLoggedIn, login } = useUser();

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login({ username, password });
  };

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      maxWidth="xl"
    >
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          px: { xs: 2, md: 10 },
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={500}
          sx={{ textAlign: "center", mb: '2.5rem' }}
        >
          Iniciar sesión
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="username"
              name="username"
              label="Usuario"
              fullWidth
              autoComplete="username"
              variant="outlined"
              type="text"
              onChange={handleChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Contraseña"
              fullWidth
              autoComplete="password"
              variant="outlined"
              type="password"
              onChange={handleChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "6px", height: "40px" }}
            >
              Iniciar sesión
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
