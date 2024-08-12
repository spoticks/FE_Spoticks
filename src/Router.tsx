import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Reservation from "./pages/Reservation";
import MatchList from "./pages/matchList/MatchList";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/NotFound";
import Registration from './pages/admin/Registration';
import { menu } from "./components/constants";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/baseball" element={<MatchList sport="야구" />} />
          <Route path="/soccer" element={<MatchList sport="축구" />} />
          <Route path="/volleyball" element={<MatchList sport="배구" />} />
          <Route path="/basketball" element={<MatchList sport="농구" />} />
          {menu
            .filter((sport) => sport !== "HOME")
            .map((sport) => (
              <Route
                key={sport}
                path={`/match-list/${sport}`}
                element={<MatchList sport={sport} />}
              />
            ))}
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/registration" element={<Registration />} />
          <Route path="/admin/registration/:id" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
