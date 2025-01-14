import { Marker, NaverMap, useNavermaps } from "react-naver-maps";

interface NaverMapProps {
  position: [number, number];
}
const RenderMap = ({ position }: NaverMapProps) => {
  const navermaps = useNavermaps();

  return (
    <NaverMap defaultCenter={new navermaps.LatLng(position[0], position[1])}>
      <Marker defaultPosition={new navermaps.LatLng(position[0], position[1])} />
    </NaverMap>
  );
};

export default RenderMap;
