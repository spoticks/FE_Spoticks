import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./common/components/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Reservation from "./pages/Reservation";
import MatchList from "./pages/MatchList";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Registration from "./pages/admin/Registration";
import { menu } from "./constants";
import AuthRoute from "./AuthRoute";
import AccountDeletion from "./pages/AccountDeletion";
import MyTicketRoute from "./MyTicketRoute";
import MyHistory from "./pages/MyHistory";
import MyTeam from "./pages/MyTeam";

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
            <Route path="account-deletion" element={<AccountDeletion />} />
            <Route path="my-team" element={<MyTeam />} />
            <Route path="my-tickets" element={<MyTicketRoute />}>
              <Route path="my-reservations" element={<MyHistory />} />
              <Route path="my-reservations/:id" element={<MyHistory />} />
              <Route path="cancellation-history" element={<MyHistory />} />
              <Route path="cancellation-history/:id" element={<MyHistory />} />
            </Route>
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
