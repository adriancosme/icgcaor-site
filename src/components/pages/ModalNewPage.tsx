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
import { Page } from "../../common/types/page.type";
type Props = {
  open: boolean;
  handleClose: () => void;
  addPage: (payload: Page) => void;
};

export const ModalNewPage: FC<Props> = ({ open, handleClose, addPage }) => {
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

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [provider, setProvider] = useState("");  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addPage({ name, url, provider });
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
          Agregar enlace
        </Typography>
        <Box sx={{ mt: "2rem" }} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Nombre"
                fullWidth
                variant="outlined"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="provider-select-label">Proveedor</InputLabel>
                <Select
                  labelId="provider-select-label"
                  required
                  name="provider"
                  label="Proveedor"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as string)}
                >
                  <MenuItem value="indar">Indar</MenuItem>
                  <MenuItem value="surtimex">Surtimex</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="url"
                name="url"
                label="URL"
                fullWidth
                variant="outlined"
                type="text"
                onChange={(e) => setUrl(e.target.value)}
              />
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
