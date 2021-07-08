import { lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { UserContext } from "./context/UserContext";
import PrivateRoute from "./utils/private-routes";
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

const App = () => {
  const { profile, isLoading } = useContext(UserContext);

  return (
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<h3>Loading...</h3>}>
        {isLoading ? (
          <h3>Loading...</h3>
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
      </Suspense>
    </MuiThemeProvider>
  );
};

export default App;
