import myTeamStore from "../../stores/myTeamStore";

interface MyTeamProps {
  selectedTeam: string;
}

export default function MyTeam({ selectedTeam }: MyTeamProps) {

  const { myTeams, addMyTeam, removeMyTeam } = myTeamStore();

  const handleMyTeam = () => {
    myTeams.includes(selectedTeam) ? removeMyTeam(selectedTeam) : addMyTeam(selectedTeam);
  }

  // myTeams에 selectedTeam이 포함되어 있는지 확인
  const isMyTeam = myTeams.includes(selectedTeam);

  return (
    <>
      {selectedTeam !== '전체 일정' && (
        <div
          onClick={handleMyTeam}
          className='flex flex-col justify-center items-center border-borders border-[1px] size-10 rounded-[10px] bg-foreground cursor-pointer'
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 33 33"
            fill={isMyTeam ? "#dd4255" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.2867 6.64666C27.6057 5.96533 26.7971 5.42485 25.9071 5.0561C25.0172 4.68735 24.0633 4.49756 23.1 4.49756C22.1367 4.49756 21.1828 4.68735 20.2929 5.0561C19.4029 5.42485 18.5943 5.96533 17.9133 6.64666L16.5 8.05999L15.0867 6.64666C13.7111 5.27107 11.8454 4.49827 9.9 4.49827C7.95462 4.49827 6.08892 5.27107 4.71333 6.64666C3.33774 8.02225 2.56494 9.88795 2.56494 11.8333C2.56494 13.7787 3.33774 15.6444 4.71333 17.02L16.5 28.8067L28.2867 17.02C28.968 16.339 29.5085 15.5304 29.8772 14.6405C30.246 13.7505 30.4358 12.7966 30.4358 11.8333C30.4358 10.87 30.246 9.91613 29.8772 9.02619C29.5085 8.13624 28.968 7.32767 28.2867 6.64666Z"
              stroke={isMyTeam ? "#dd4255" : "#767676"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className={`text-[15px] ${isMyTeam ? 'text-Accent' : 'text-borders'}`}>홈팀</div>
        </div>
      )}
    </>
  );
}
