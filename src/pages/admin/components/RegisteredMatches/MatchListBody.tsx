import { MainMatchType } from "@/common/types/matchTypes";

interface TbodyCompProps {
  matches?: MainMatchType[];
  onMatchSelect: (match: MainMatchType) => void;
}

export default function MatchListBody({ matches, onMatchSelect }: TbodyCompProps) {
  return (
    <>
      {matches?.length ? (
        matches.map((match, index) => (
          <tr key={index} className="border-b border-borders">
            <td className="p-4">{match.gameStartTime.split("T")[0]}</td>
            <td className="p-4">{match.gameStartTime.split("T")[1].slice(0, 5)}</td>
            <td className="p-4">{match.homeTeamName}</td>
            <td className="p-4">{match.awayTeamName}</td>
            <td className="p-4 pl-8">{match.sport}</td>
            <td className="p-4">
              <button
                onClick={() => onMatchSelect(match)}
                className="flex cursor-pointer items-center justify-center rounded bg-Accent px-6 py-2 text-white hover:opacity-75"
              >
                경기상세
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="p-4 text-center">
            경기가 없습니다.
          </td>
        </tr>
      )}
    </>
  );
}
