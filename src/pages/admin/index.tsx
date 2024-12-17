import React, { Suspense, useState, startTransition } from "react";
import Loading from "@/common/components/atoms/Loading";
import Header from "./components/ui/Header";
import { menu } from "@/common/constants";
import { useNavigate } from "react-router-dom";
import RegisteredMatchList from "./components/ui/RegisteredMatchList";

export default function Admin() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<string>("All");
  const sports = menu.filter((el) => el !== "HOME");

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sport = e.target.value;

    startTransition(() => {
      setSelectedSport(sport);
      navigate(`/admin/${sport}`);
    });
  };

  return (
    <section className="mx-0 my-10 flex w-full flex-col justify-start">
      <Header />
      <div className="p-4">
        <label htmlFor="sportFilter" className="mr-2">
          스포츠 선택:
        </label>
        <select
          id="sportFilter"
          value={selectedSport}
          onChange={handleSportChange}
          className="cursor-pointer rounded border p-2 hover:text-Accent"
        >
          <option value="All">전체</option>
          {sports.map((sport, idx) => (
            <option key={idx} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>
      <Suspense fallback={<Loading />}>
        <RegisteredMatchList selectedSport={selectedSport} />
      </Suspense>
    </section>
  );
}
