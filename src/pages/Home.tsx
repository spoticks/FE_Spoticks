import Tickets from "../assets/Tickets.svg";
import MainMatch from "../components/MainMatch/MainMatch";
import WeeklyMatches from "../components/WeeklyMatches/WeeklyMatches";

export default function Home() {
  return (
    <div className="mb-24">
      <section className="my-8 flex items-center justify-between text-center">
        <MainMatch />
        <div>
          <img src={Tickets} alt="Tickets Illustration" />
        </div>
      </section>
      <section>
        <WeeklyMatches />
      </section>
    </div>
  );
}
