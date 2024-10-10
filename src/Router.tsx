import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "./common/components/Layout";
import SignUp from "./pages/SignUp";
import Login from "@/pages/Login";
import Reservation from "./pages/Reservation";
import MatchList from "./pages/MatchList";
import Admin from "@/pages/admin/index";
import NotFound from "./pages/NotFound";
import Registration from "@/pages/admin/components/Registration";
import { menu } from "./common/constants";
import AuthRoute from "./common/components/AuthRoute";
import AccountDeletion from "@/pages/AccountDeletion";
import MyTeam from "./pages/MyTeam";
import MyTicket from "@/pages/MyTicket";
import MyTicketRouteLayout from "@/pages/MyTicket/components/MyTicketRouteLayout";
import MyPage from "@/pages/MyPage";

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
            <Route path="my-tickets" element={<MyTicketRouteLayout />}>
              <Route path="my-reservations" element={<MyTicket />} />
              <Route path="my-reservations/:id" element={<MyTicket />} />
              <Route path="cancellation-history" element={<MyTicket />} />
              <Route path="cancellation-history/:id" element={<MyTicket />} />
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
