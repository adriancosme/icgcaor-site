import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Stack,
  Button,
  TextFieldProps,
  Divider,
  Chip,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { FC, FormEvent, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import moment, { Moment } from "moment";
type Props = {
  open: boolean;
  handleClose: () => void;
  downloadFile: ({
    dateStart,
    dateEnd,
  }: {
    dateStart: string;
    dateEnd: string;
  }) => void;
};
export const ModalDownloadRegisters: FC<Props> = ({
  open,
  handleClose,
  downloadFile,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 688,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [isYesterdaySelected, setIsYesterdaySelected] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState(false);
  const [dateStart, setDateStart] = useState<Moment | null>(null);
  const [dateEnd, setDateEnd] = useState<Moment | null>(null);

  const handleTodayButton = () => {
    setIsTodaySelected(true);
    setIsYesterdaySelected(false);
    setIsWeekSelected(false);
    setDateStart(null);
    setDateEnd(null);
  };
  const handleYesterdayButton = () => {
    setIsTodaySelected(false);
    setIsYesterdaySelected(true);
    setIsWeekSelected(false);
    setDateStart(null);
    setDateEnd(null);
  };
  const handleWeekButton = () => {
    setIsTodaySelected(false);
    setIsYesterdaySelected(false);
    setIsWeekSelected(true);
    setDateStart(null);
    setDateEnd(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    var currentDate = moment();
    if (dateStart != null && dateEnd != null) {
      downloadFile({
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
      });
    }
    if (isTodaySelected) {      
      downloadFile({
        dateStart: currentDate.clone().startOf("day").toISOString(),
        dateEnd: currentDate.clone().endOf("day").toISOString(),
      });
    }
    if (isYesterdaySelected) {      
      downloadFile({
        dateStart: currentDate
          .clone()
          .subtract(1, "day")
          .startOf("day")
          .toISOString(),
        dateEnd: currentDate
          .clone()
          .subtract(1, "day")
          .endOf("day")
          .toISOString(),
      });
    }
    if (isWeekSelected) {      
      downloadFile({
        dateStart: currentDate.clone().startOf("isoWeek").toISOString(),
        dateEnd: currentDate.clone().endOf("isoWeek").toISOString(),
      });
    }
    setIsTodaySelected(false);
    setIsYesterdaySelected(false);
    setIsWeekSelected(false);
    setDateStart(null);
    setDateEnd(null);
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setIsTodaySelected(false);
          setIsYesterdaySelected(false);
          setIsWeekSelected(false);
          setDateStart(null);
          setDateEnd(null);
          handleClose();
        }}
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
            Descargar registros
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: "1rem" }}>
            Selecciona las fechas para la cual quieres descargar tus registros
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: "left", mt: "1rem" }}
            fontWeight={500}
          >
            Rango de fechas
          </Typography>
          <Box sx={{ mt: "2rem" }} component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                  disabled={
                    isTodaySelected || isYesterdaySelected || isWeekSelected
                  }
                  label="Desde"
                  inputFormat="DD/MM/YYYY"
                  value={dateStart}
                  onChange={(newValue) => setDateStart(newValue)}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DesktopDatePicker
                  disabled={
                    isTodaySelected || isYesterdaySelected || isWeekSelected
                  }
                  label="Hasta"
                  inputFormat="DD/MM/YYYY"
                  value={dateEnd}
                  onChange={(newValue) => setDateEnd(newValue)}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
            <Divider
              sx={{
                "&::before": { borderTop: "1px solid #9CA3AF" },
                "&::after": { borderTop: "1px solid #9CA3AF" },
              }}
              flexItem
            >
              <Chip
                label="O"
                variant="outlined"
                color="default"
                sx={{ border: "none" }}
              />
            </Divider>
            <Typography
              variant="h5"
              sx={{ textAlign: "left", mt: "1rem" }}
              fontWeight={500}
            >
              Rango de fechas
            </Typography>
            <Box sx={{ mt: "1rem" }}>
              <Stack direction="row" spacing={4}>
                <Chip
                  sx={{
                    width: 92,
                    bgcolor: isTodaySelected ? "#C7D2FE" : "#FFF",
                  }}
                  size="medium"
                  label="Hoy"
                  color={isTodaySelected ? "primary" : "default"}
                  variant="outlined"
                  component="button"
                  onClick={handleTodayButton}
                  disabled={Boolean(dateStart) || Boolean(dateEnd)}
                />
                <Chip
                  sx={{
                    width: 92,
                    bgcolor: isYesterdaySelected ? "#C7D2FE" : "#FFF",
                  }}
                  size="medium"
                  label="Ayer"
                  color={isYesterdaySelected ? "primary" : "default"}
                  variant="outlined"
                  component="button"
                  onClick={handleYesterdayButton}
                  disabled={Boolean(dateStart) || Boolean(dateEnd)}
                />
                <Chip
                  sx={{
                    width: 92,
                    bgcolor: isWeekSelected ? "#C7D2FE" : "#FFF",
                  }}
                  size="medium"
                  label="Semana"
                  color={isWeekSelected ? "primary" : "default"}
                  variant="outlined"
                  component="button"
                  onClick={handleWeekButton}
                  disabled={Boolean(dateStart) || Boolean(dateEnd)}
                />
              </Stack>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Stack spacing={2} direction="row-reverse">
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<FileDownloadOutlinedIcon />}
                  >
                    Descargar
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      setIsTodaySelected(false);
                      setIsYesterdaySelected(false);
                      setIsWeekSelected(false);
                      setDateStart(null);
                      setDateEnd(null);
                      handleClose();
                    }}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
