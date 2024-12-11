import { useEffect } from "react";
//html에 동적으로 script 추가
const MapScriptLoader: React.FC = () => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_MAP_CLIENT_ID;

    if (!clientId) {
      console.error("네이버 지도 API Client ID가 설정되지 않았습니다.");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`;
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default MapScriptLoader;
