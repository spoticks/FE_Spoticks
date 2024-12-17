import { AdminMatchType, PageInfoProps } from "@/common/types/matchTypes";
import React from "react";

interface matchesProps {
  content: AdminMatchType[];
  pageInfo: PageInfoProps;
}

export default function TbodyComp({
  matches,
  onMatchSelect,
  totalElements,
}: {
  matches: matchesProps[];
  onMatchSelect: (match: AdminMatchType) => void;
  totalElements: number;
}) {
  return (
    <>
      {totalElements ? (
        matches.map((page, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {page.content.map((match, index) => (
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
            ))}
          </React.Fragment>
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
