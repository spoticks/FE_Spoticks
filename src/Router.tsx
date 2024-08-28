import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Reservation from "./pages/seats/Reservation";
import MatchList from "./pages/matchList/MatchList";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/NotFound";
import Registration from "./pages/admin/Registration";
import { menu } from "./components/constants";
import MyTickets from "./pages/MyTickets";
import AuthRoute from "./AuthRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {menu
            .filter((sport) => sport !== "HOME")
            .map((sport) => (
              <Route
                key={sport}
                path={`/match-list/${sport}`}
                element={<MatchList sport={sport} />}
              />
            ))}
          <Route path="profile" element={<AuthRoute />}>
            <Route path="user-info" element={<MyPage />} />
            <Route path="my-tickets" element={<MyTickets />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/registration" element={<Registration />} />
          <Route path="/admin/registration/:id" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/reservation/:gameId" element={<Reservation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
