import { useEffect, useState, lazy, Suspense, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "./context/UserContext";
import PrivateRoute from "./utils/private-routes";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const LandingPage = lazy(() => import("./pages/landing"));

const App = () => {
  const { profile, isLoading } = useContext(UserContext);
  const [socket, setSocket] = useState();
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

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
        </Switch>
      )}
    </Suspense>
  );
};

export default App;
