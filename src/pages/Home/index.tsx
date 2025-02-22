import MainMatch from "@/pages/Home/components/MainMatch";
import Tickets from "@/assets/Tickets.svg?react";
import WeeklyMatches from "@/pages/Home/components/WeeklyMatches";
import useMemberInfo from "@/hooks/useMemberInfo";
import { Navigate } from "react-router-dom";

export default function Home() {
  const authority = useMemberInfo();

  if (authority === "ROLE_ADMIN") {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="mb-24">
      <section className="my-12 flex items-center justify-between text-center">
        <MainMatch />
        <Tickets />
      </section>
      <WeeklyMatches />
    </div>
  );
}
