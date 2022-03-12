import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import {RegisterGuard} from "components/routing/routeProtectors/RegisterGuard";
import Registration from "components/views/Registration";
import {InspectUserGuard} from "components/routing/routeProtectors/InspectUserGuard";
import InspectUser from "components/views/InspectUser";
import ChangeUserDetails from "components/views/ChangeUserDetails";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game"/>
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path="/registration">
          <RegisterGuard>
            <Registration/>
          </RegisterGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route path ="/users/:userId">
            <InspectUser/>
        </Route>
        <Route path ="/users/:userId">
          <InspectUserGuard>
            <InspectUser/>
          </InspectUserGuard>
        </Route>
        <Route path ="/changeUserDetails/:userId">
            <ChangeUserDetails/>
        </Route>
      <Route path ="/users/:userId">
        <ChangeUserDetails/>
      </Route>
        <Route path ="/logout/:userId">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>
    </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
