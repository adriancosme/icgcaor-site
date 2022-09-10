import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Redirect } from "wouter";
import { ModalDownloadRegisters } from "../components/downloads/ModalDownloadRegisters";
import { ModalNewPage } from "../components/pages/ModalNewPage";
import usePages from "../hooks/usePages";
import useProducts from "../hooks/useProducts";
import useUser from "../hooks/useUser";

const Dashboard = () => {
  const { isLoggedIn, logout } = useUser();
  const [openNewPage, setOpenNewPage] = useState(false);
  const [openDownloads, setOpenDownloads] = useState(false);
  const { countProducts, lastUpdate, downloadFile } = useProducts();
  const { pages, addPage } = usePages();

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
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
        <Typography variant="h4" fontWeight={500}>
          Mayorista ferretero
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          Total de productos: <strong>{countProducts}</strong>
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          Ultima actualizacion: <strong>{lastUpdate}</strong>
        </Typography>
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}
        >
          <Typography variant="h4" fontWeight={500}>
            Proveedores a analizar
          </Typography>
          <Box component="div">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{ mr: "1.5rem" }}
              onClick={() => setOpenNewPage(true)}
            >
              Agregar proveedor
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={() => setOpenDownloads(true)}
            >
              Descargar registros
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mt: "1rem" }} />
        <Stack spacing={2} sx={{ mt: "1rem" }}>
          {pages.map((page) => {
            return (
              <Box
                component="a"
                sx={{
                  marginTop: "1rem",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textDecoration: "none",
                  color: "#111827",
                }}
                href={page.url}
                target="_blank"
                rel="noopener,noreferrer"
              >
                {page.name}
              </Box>
            );
          })}
        </Stack>
      </Container>
      <ModalNewPage
        open={openNewPage}
        handleClose={() => setOpenNewPage(false)}
        addPage={addPage}
      />
      <ModalDownloadRegisters
        open={openDownloads}
        handleClose={() => setOpenDownloads(false)}
        downloadFile={downloadFile}
      />
    </>
  );
};

export default Dashboard;
