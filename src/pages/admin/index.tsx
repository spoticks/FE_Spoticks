import { Suspense, useState } from "react";
import Loading from "@/common/components/atoms/Loading";
import Header from "./components/RegisteredMatches/Header";
import RegisteredMatchList from "./components/RegisteredMatches";

export default function Admin() {
  const [selectedSport, setSelectedSport] = useState<string>("All");

  return (
    <section className="mx-0 my-10 flex w-full flex-col justify-start">
      <Header />
      <Suspense fallback={<Loading />}>
        <RegisteredMatchList selectedSport={selectedSport} setSelectedSport={setSelectedSport} />
      </Suspense>
    </section>
  );
}
