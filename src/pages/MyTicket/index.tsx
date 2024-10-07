import Loading from "@/common/components/atoms/Loading";
import InformationCard from "@/pages/MyTicket/components/InformationCard";
import ErrorPage from "@/pages/ErrorPage";
import useMyTicketHistory from "@/pages/MyTicket/api/useMyTicketHistory";

export default function MyTicket() {
  const { data, isLoading, isError } = useMyTicketHistory();

  if (isLoading) {
    return (
      <div className="w-full gap-[40px]">
        <Loading />
      </div>
    );
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="grid grid-cols-3 flex-wrap gap-4">
      {/** InformationCard 혹은 정보 없음을 표시할 것. */}
      {data.length ? (
        data.map((el) => <InformationCard content={el} key={el.gameId} />)
      ) : (
        <span>조회 내역이 없습니다!</span>
      )}
      {/* <DefaultCard>
        {" "}
        <div className="p-[20px]">
          <div className="mb-2 border-b border-borders pb-2">
            <span className="font-bold">SSG 렌더스 vs KIA 타이거즈</span>
            <div className="mt-3 flex items-center gap-3">
              <BsCalendar2EventFill className="size-4" />
              <div className="flex flex-col text-xs">
                <span className="">2024.07.20</span>
                <span className="text-text-tertiary">12:59</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <MdLocationOn className="size-4" />
              <span className="text-xs">광주 챔피언스 필드</span>
            </div>
          </div>
          <button className="text-xs text-Accent">상세정보</button>
        </div>
      </DefaultCard>{" "}
      <DefaultCard>
        {" "}
        <div className="p-[20px]">
          <div className="mb-2 border-b border-borders pb-2">
            <span className="font-bold">SSG 렌더스 vs KIA 타이거즈</span>
            <div className="mt-3 flex items-center gap-3">
              <BsCalendar2EventFill className="size-4" />
              <div className="flex flex-col text-xs">
                <span className="">2024.07.20</span>
                <span className="text-text-tertiary">12:59</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <MdLocationOn className="size-4" />
              <span className="text-xs">광주 챔피언스 필드</span>
            </div>
          </div>
          <button className="text-xs text-Accent">상세정보</button>
        </div>
      </DefaultCard>{" "}
      <DefaultCard>
        {" "}
        <div className="p-[20px]">
          <div className="mb-2 border-b border-borders pb-2">
            <span className="font-bold">SSG 렌더스 vs KIA 타이거즈</span>
            <div className="mt-3 flex items-center gap-3">
              <BsCalendar2EventFill className="size-4" />
              <div className="flex flex-col text-xs">
                <span className="">2024.07.20</span>
                <span className="text-text-tertiary">12:59</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <MdLocationOn className="size-4" />
              <span className="text-xs">광주 챔피언스 필드</span>
            </div>
          </div>
          <button className="text-xs text-Accent">상세정보</button>
        </div>
      </DefaultCard>{" "}
      <DefaultCard>
        {" "}
        <div className="p-[20px]">
          <div className="mb-2 border-b border-borders pb-2">
            <span className="font-bold">SSG 렌더스 vs KIA 타이거즈</span>
            <div className="mt-3 flex items-center gap-3">
              <BsCalendar2EventFill className="size-4" />
              <div className="flex flex-col text-xs">
                <span className="">2024.07.20</span>
                <span className="text-text-tertiary">12:59</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <MdLocationOn className="size-4" />
              <span className="text-xs">광주 챔피언스 필드</span>
            </div>
          </div>
          <button className="text-xs text-Accent">상세정보</button>
        </div>
      </DefaultCard>{" "}
      <DefaultCard>
        {" "}
        <div className="p-[20px]">
          <div className="mb-2 border-b border-borders pb-2">
            <span className="font-bold">SSG 렌더스 vs KIA 타이거즈</span>
            <div className="mt-3 flex items-center gap-3">
              <BsCalendar2EventFill className="size-4" />
              <div className="flex flex-col text-xs">
                <span className="">2024.07.20</span>
                <span className="text-text-tertiary">12:59</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <MdLocationOn className="size-4" />
              <span className="text-xs">광주 챔피언스 필드</span>
            </div>
          </div>
          <button className="text-xs text-Accent">상세정보</button>
        </div>
      </DefaultCard>{" "}
      <DefaultCard>
        {" "}
        <div className="p-[20px]">
          <div className="mb-2 border-b border-borders pb-2">
            <span className="font-bold">SSG 렌더스 vs KIA 타이거즈</span>
            <div className="mt-3 flex items-center gap-3">
              <BsCalendar2EventFill className="size-4" />
              <div className="flex flex-col text-xs">
                <span className="">2024.07.20</span>
                <span className="text-text-tertiary">12:59</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <MdLocationOn className="size-4" />
              <span className="text-xs">광주 챔피언스 필드</span>
            </div>
          </div>
          <button className="text-xs text-Accent">상세정보</button>
        </div>
      </DefaultCard> */}
    </div>
  );
}
