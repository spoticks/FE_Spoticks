import MainMatch from "@/pages/Home/components/MainMatch";
import Tickets from "@/assets/Tickets.svg?react";
import WeeklyMatches from "@/pages/Home/components/WeeklyMatches";

export default function Home() {
  return (
    <div className="mb-24">
      <section className="my-8 flex items-center justify-between text-center">
        <MainMatch />
        <div>
          <Tickets />
        </div>
      </section>
      <section>
        <WeeklyMatches />
      </section>
    </div>
  );
}
