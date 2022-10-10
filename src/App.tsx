import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Route, Switch } from "wouter";
import "./App.css";
import UserContextProvider from "./context/UserContext";
import theme from "./hooks/useTheme";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { Login } from "./pages/Login";
function App() {
  return (
    <UserContextProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="App">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard}  />
              <Route path="/users" component={Users} />
              <Route component={Login} />
            </Switch>
          </ThemeProvider>
        </div>
      </LocalizationProvider>
    </UserContextProvider>
  );
}

export default App;
