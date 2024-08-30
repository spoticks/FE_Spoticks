export const menu = ["HOME", "야구", "축구", "배구", "농구"];

export const teams: Record<string, string[]> = {
  축구: [
    "울산 현대",
    "포항 스틸러스",
    "전북 현대 모터스",
    "FC 서울",
    "수원 삼성 블루윙즈",
    "인천 유나이티드",
    "대구 FC",
    "광주 FC",
    "제주 유나이티드",
  ],
  야구: [
    "NC 다이노스",
    "KIA 타이거즈",
    "두산 베어스",
    "한화 이글스",
    "키움 히어로즈",
    "LG 트윈스",
    "삼성 라이온즈",
    "롯데 자이언츠",
    "SSG 랜더스",
    "KT 위즈",
  ],
  배구: ["대한항공점보스", "현대캐피탈", "ok금융그룹", "우리카드", "kb손해보험 스타즈"],
  농구: ["서울 Sk 나이츠", "고양 캐롯 점퍼스", "원주 DB 프로미"],
};
export const stadiums: Record<string, string[]> = {
  축구: ["울산", "포항", "전북", "서울", "수원", "인천", "대구", "광주", "제주"],
  야구: ["대구", "잠실(서울)", "고척(서울)", "사직(부산)", "문학(인천)", "NC파크(창원)"],
  배구: ["인천", "천안", "안산", "장충(서울)", "의정부", "대전", "수원"],
  농구: ["서울", "고양", "원주"],
};

export const leagueName: Record<string, string> = {
  축구: "K",
  야구: "KBO",
  배구: "V-",
  농구: "KBL",
};

export const localUrl = import.meta.env.REACT_APP_LOCAL_URL;
