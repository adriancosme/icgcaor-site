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
import { FC, FormEvent, useState } from "react";
import { IUser, Role } from "../../common/types/user.type";
type Props = {
  open: boolean;
  handleClose: () => void;
  addUser: (payload: IUser) => void;
};

export const ModalNewUser: FC<Props> = ({ open, handleClose, addUser }) => {
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

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>(Role.USER);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addUser({ username, password, role });
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
          Agregar usuario
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>           
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="password"
                name="password"
                autoComplete="off"
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
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
                  Agregar
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
