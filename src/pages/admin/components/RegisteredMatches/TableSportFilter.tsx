import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { menu } from "@/common/constants";

export default function TableSportFilter({
  selectedSport,
  setSelectedSport,
}: {
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
}) {
  const navigate = useNavigate();
  const sports = ["All", ...menu.filter((el) => el !== "HOME")];

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sport = e.target.value;

    startTransition(() => {
      setSelectedSport(sport);
      navigate(`/admin/${sport}`);
    });
  };

  return (
    <select
      id="sportFilter"
      value={selectedSport}
      onChange={handleSportChange}
      className="cursor-pointer rounded border p-2 hover:text-Accent"
    >
      {sports.map((sport, idx) => (
        <option key={idx} value={sport}>
          {sport}
        </option>
      ))}
    </select>
  );
}
