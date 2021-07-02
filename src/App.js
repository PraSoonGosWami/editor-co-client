import { lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import PrivateRoute from "./utils/private-routes";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const LandingPage = lazy(() => import("./pages/landing"));
const TextEditor = lazy(() => import("./pages/text-editor"));

const App = () => {
  const { profile, isLoading } = useContext(UserContext);

  return (
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
            component={TextEditor}
          />
        </Switch>
      )}
    </Suspense>
  );
};

export default App;
