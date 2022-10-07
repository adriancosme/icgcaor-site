import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Divider, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar,
  Typography
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Redirect } from "wouter";
import { ModalNewPage } from "../components/pages/ModalNewPage";
import { ModalEditPage } from "../components/pages/ModalEditPage";
import usePages from "../hooks/usePages";
import useProducts from "../hooks/useProducts";
import useUser from "../hooks/useUser";
import { Page } from "../common/types/page.type";

const Dashboard = () => {
  const { isLoggedIn, logout } = useUser();
  const [openNewPage, setOpenNewPage] = useState(false);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [editedPage, setEditedPage] = useState<Page>({} as Page);
  const { countProducts, lastUpdate, downloadFile } = useProducts();
  const { pages, addPage, editPage, hasError, closeError, errorText, removePage } =
    usePages();

  const handleClickDownload = () => {
    var currentDate = moment();
    downloadFile({
      dateStart: currentDate.clone().startOf("day").toISOString(),
      dateEnd: currentDate.clone().endOf("day").toISOString(),
    });
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Snackbar
        open={hasError}
        autoHideDuration={6000}
        onClose={closeError}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
          {errorText}
        </Alert>
      </Snackbar>
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
              Agregar enlace
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={handleClickDownload}
            >
              Descargar registros
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mt: "1rem" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Proveedor</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((page) => (
                <TableRow
                  key={page._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {page.name}
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                    {page.provider}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        if (page._id) {
                          setEditedPage(page);
                          setOpenEditPage(true);
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => (page._id ? removePage(page._id) : null)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
      {
        openNewPage &&
        <ModalNewPage
          open={openNewPage}
          handleClose={() => setOpenNewPage(false)}
          addPage={addPage}
        />
      }
      {openEditPage &&
        <ModalEditPage
          open={openEditPage}
          handleClose={() => {
            setOpenEditPage(false);
            setEditedPage({} as Page);
          }}
          editPage={editPage}
          page={editedPage}
        />}
    </>
  );
};

export default Dashboard;
