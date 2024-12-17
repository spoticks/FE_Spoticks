import { useNavermaps } from "react-naver-maps";
import { useEffect } from "react";

interface UseGetAddressProps {
  position: [number, number];
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

interface AddressInfo {
  jibunAddress: string | null;
  roadAddress: string | null;
  buildingName: string | null;
  englishAddress: string | null;
  longitude: number;
  latitude: number;
}

interface ReverseGeocodeResponse {
  v2: {
    address: AddressInfo;
  };
}

export const useGetAddress = ({ position, setAddress }: UseGetAddressProps) => {
  // const clientId = import.meta.env.VITE_MAP_CLIENT_ID;
  const naverMaps = useNavermaps();

  useEffect(() => {
    const [latitude, longitude] = position;

    if (!naverMaps) {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
      return;
    }

    naverMaps.Service.reverseGeocode(
      {
        coords: new naverMaps.LatLng(latitude, longitude),
      },
      (status: string, response: ReverseGeocodeResponse) => {
        if (status !== naverMaps.Service.Status.OK) {
          console.error("Reverse Geocoding에 실패했습니다:", status);
          setAddress("주소를 찾을 수 없습니다.");
          return;
        }

        const result = response.v2.address;
        const fullAddress =
          result?.jibunAddress || result?.roadAddress || "주소를 찾을 수 없습니다.";
        setAddress(fullAddress);
      },
    );
  }, [position, setAddress, naverMaps]);
};
