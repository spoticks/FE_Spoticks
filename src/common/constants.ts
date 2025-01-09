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
  배구: [
    "대한항공 점보스",
    "현대캐피탈 스카이워커스",
    "ok저축은행 읏맨",
    "우리카드 우리WON",
    "삼성화제 블루팡스",
  ],
  농구: [
    "서울 SK 나이츠",
    "안양 정관장 레드부스터스",
    "원주 DB 프로미",
    "부산 KCC 이지스",
    "창원 LG 세이커스",
  ],
};
export const stadiums: Record<string, string[]> = {
  축구: [
    "울산문수월드컵경기장",
    "포항스틸야드",
    "전주월드컵경기장",
    "서울월드컵경기장",
    "수원월드컵경기장",
    "인천축구전용경기장",
    "대구은행파크",
    "광주축구전용구장",
    "제주월드컵경기장",
  ],
  야구: [
    "창원NC파크",
    "광주기아챔피언스필드",
    "서울종합운동장야구장",
    "대전한화생명이글스파크",
    "고척스카이돔",
    "잠실 야구장",
    "대구라이온즈파크",
    "사직야구장",
    "인천SSG랜더스필드",
    "수원KT위즈파크",
  ],
  배구: ["인천계양체육관", "대전유관순체육관", "안산상록수체육관", "장충체육관", "대전충무체육관"],
  농구: ["잠실학생체육관", "안양정관장아레나", "원주종합체육관", "사직실내체육관", "창원체육관"],
};

export const leagueName: Record<string, string> = {
  축구: "K",
  야구: "KBO",
  배구: "V-",
  농구: "KBL",
};

export const localUrl = import.meta.env.VITE_LOCAL_URL;

export const teamMembers = [
  {
    role: "FE",
    name: "도현수",
    url: "https://github.com/dohyeons",
  },
  {
    role: "FE",
    name: "노경민",
    url: "https://github.com/devminoh",
  },
  {
    role: "BE",
    name: "김지효",
    url: "https://github.com/zirryo",
  },
];
