import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { FC, FormEvent, useEffect, useState } from "react";
import { IUser } from "../../common/types/user.type";
type Props = {
  open: boolean;
  user: IUser;
  handleClose: () => void;
  editUser: (payload: IUser) => void;
};

export const ModalEditUser: FC<Props> = ({ open, handleClose, editUser, user }) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 512,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {    
    setUsername(user.username ?? '');
    setRole(user.role ?? '');    
  }, [])
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload: IUser = {
      _id: user._id, username, role
    }
    if (password.length > 0) {
      payload['password'] = password
    }
    editUser(payload);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
          fontWeight={500}
        >
          Editar usuario
        </Typography>
        <Box sx={{ mt: "2rem" }} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="username"
                name="username"
                label="Usuario"
                fullWidth
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField                
                id="password"
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Rol</InputLabel>
                <Select
                  labelId="role-select-label"
                  required
                  name="role"
                  label="Rol"
                  value={role}
                  onChange={(e) => setRole(e.target.value as string)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Stack spacing={2} direction="row-reverse">
                <Button type="submit" variant="contained">
                  Guardar
                </Button>
                <Button variant="text" onClick={handleClose}>
                  Cancelar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
