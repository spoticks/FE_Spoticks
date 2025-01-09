import Loading from "@/common/components/atoms/Loading";
import useStadiumApi from "../../api/useStadiumApi";
import RenderMap from "./RenderMap";
import { Container as MapDiv, NavermapsProvider } from "react-naver-maps";
import { Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTeamId } from "@/common/utils/getTeamId";

const HomeInfo = () => {
  const location = useLocation();
  const sportEncoded = location.pathname.split("/")[2];
  const teamNameEncoded = location.pathname.split("/")[3];
  const sport = decodeURIComponent(sportEncoded);
  const teamName = decodeURIComponent(teamNameEncoded);
  const teamId = getTeamId(sport, teamName);

  const { data, isLoading } = useStadiumApi({ teamId });
  const clientId = import.meta.env.VITE_MAP_CLIENT_ID;
  const [address] = useState<string>("");

  const defaultPosition: [number, number] = [37.5665, 126.978];
  const position: [number, number] =
    data?.latitude && data?.longitude ? [data.latitude, data.longitude] : defaultPosition;

  //주소추가는 좀더 공부해보고 추가하겠습니다.ㅠㅠㅠㅠ
  // useGetAddress({ position, setAddress });

  if (isLoading || !clientId) return <Loading />;

  return (
    <>
      <NavermapsProvider ncpClientId={clientId}>
        <h1 className="font-semibold text-Accent">
          경기장명: <span className="font-normal text-black">{data?.stadiumName}</span>
        </h1>
        <h3 className="font-semibold text-Accent">
          주소:{" "}
          <Suspense fallback={<div>주소 찾는 중...</div>}>
            <span className="font-normal text-black">{address}</span>
          </Suspense>
        </h3>
        <MapDiv
          style={{
            width: "100%",
            height: "600px",
          }}
        >
          <RenderMap position={position} />
        </MapDiv>
      </NavermapsProvider>
    </>
  );
};

export default HomeInfo;
