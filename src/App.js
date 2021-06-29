import { useEffect, useState, lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "./context/UserContext";

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
          <Route path="/">
            {profile ? <DashboardPage /> : <LandingPage />}
          </Route>
        </Switch>
      )}
    </Suspense>
  );
};

export default App;
