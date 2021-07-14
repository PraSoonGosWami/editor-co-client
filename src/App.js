import { lazy, useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import ReactGA from "react-ga";
import AlertTemplate from "react-alert-template-basic";
import Loader from "./components/loader";
import { UserContext } from "./context/UserContext";
import PrivateRoute from "./utils/private-routes";
import SuspenseWithLoader from "./components/suspense-with-loader";
import { DocContextProvider } from "./context/DocumentContext";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const LandingPage = lazy(() => import("./pages/landing"));
const TextEditor = lazy(() => import("./pages/text-editor"));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "8px",
  transition: transitions.SCALE,
};

const App = () => {
  const { profile, isLoading } = useContext(UserContext);
  //google analytics
  function initializeReactGA() {
    ReactGA.initialize("G-D5GKLZXBTG");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  useEffect(() => {
    initializeReactGA();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <SuspenseWithLoader>
          {isLoading ? (
            <Loader />
          ) : (
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <PrivateRoute
                auth={Boolean(profile)}
                path="/dashboard"
                exact
                component={DashboardPage}
              />

              <PrivateRoute
                auth={Boolean(profile)}
                path="/doc/:id"
                exact
                component={() => (
                  <DocContextProvider>
                    <TextEditor />
                  </DocContextProvider>
                )}
              />
            </Switch>
          )}
        </SuspenseWithLoader>
      </AlertProvider>
    </MuiThemeProvider>
  );
};

export default App;
