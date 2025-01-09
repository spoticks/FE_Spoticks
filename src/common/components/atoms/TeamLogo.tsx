// 야구
import Hanhwa from "@/assets/baseballTeam/hanhwa_eagles.svg?react";
import Lg from "@/assets/baseballTeam/lg-twins.svg?react";
import Kt from "@/assets/baseballTeam/kt-wiz.svg?react";
import Ssg from "@/assets/baseballTeam/ssg-landers.svg?react";
import Nc from "@/assets/baseballTeam/nc-dinos.svg?react";
import Doosan from "@/assets/baseballTeam/doosan-bears.svg?react";
import Kia from "@/assets/baseballTeam/kia-tigers.svg?react";
import Lotte from "@/assets/baseballTeam/lotte-giants.svg?react";
import Kiwoom from "@/assets/baseballTeam/kiwoom-heros.svg?react";
import Samsung from "@/assets/baseballTeam/samsung-lions.svg?react";
// 축구
import Ulsan from "@/assets/footballTeam/ulsan_hyundai.svg?react";
import Pohang from "@/assets/footballTeam/pohang_steelers.svg?react";
import Jeonbook from "@/assets/footballTeam/jeonbook_hyundai.svg?react";
import Seoul from "@/assets/footballTeam/seoul_fc.svg?react";
import Suwon from "@/assets/footballTeam/suwon_samsung.svg?react";
import Incheon from "@/assets/footballTeam/incheon_united.svg?react";
import Daegu from "@/assets/footballTeam/daegu_fc.svg?react";
import Gwangju from "@/assets/footballTeam/gwangju_fc.svg?react";
import Jeju from "@/assets/footballTeam/jeju_united.svg?react";
// 배구
import Jumbos from "@/assets/volleyballTeam/deahan_jumbos.svg?react";
import Skywalkers from "@/assets/volleyballTeam/hyundaicapital_skywalkers.svg?react";
import Okman from "@/assets/volleyballTeam/ok_okman.svg?react";
import Woori from "@/assets/volleyballTeam/woori_one.svg?react";
import Bluefangs from "@/assets/volleyballTeam/samsung_bluefangs.svg?react";
//농구
import Knights from "@/assets/basketballTeam/sk_knights.svg?react";
import Redboosters from "@/assets/basketballTeam/jungkwanjang_redboosters.svg?react";
import Promy from "@/assets/basketballTeam/db_promy.svg?react";
import Egis from "@/assets/basketballTeam/kcc_egis.svg?react";
import Sakers from "@/assets/basketballTeam/lg_sakers.svg?react";

const teamLogos: Record<string, React.FunctionComponent<React.SVGAttributes<SVGElement>>> = {
  "한화 이글스": Hanhwa,
  "LG 트윈스": Lg,
  "KT 위즈": Kt,
  "SSG 랜더스": Ssg,
  "NC 다이노스": Nc,
  "두산 베어스": Doosan,
  "KIA 타이거즈": Kia,
  "롯데 자이언츠": Lotte,
  "키움 히어로즈": Kiwoom,
  "삼성 라이온즈": Samsung,
  "울산 현대": Ulsan,
  "포항 스틸러스": Pohang,
  "전북 현대 모터스": Jeonbook,
  "FC 서울": Seoul,
  "수원 삼성 블루윙즈": Suwon,
  "인천 유나이티드": Incheon,
  "대구 FC": Daegu,
  "광주 FC": Gwangju,
  "제주 유나이티드": Jeju,
  "대한항공 점보스": Jumbos,
  "현대캐피탈 스카이워커스": Skywalkers,
  "ok저축은행 읏맨": Okman,
  "우리카드 우리WON": Woori,
  "삼성화제 블루팡스": Bluefangs,
  "서울 SK 나이츠": Knights,
  "안양 정관장 레드부스터스": Redboosters,
  "원주 DB 프로미": Promy,
  "부산 KCC 이지스": Egis,
  "창원 LG 세이커스": Sakers,
};

interface TeamLogoProps {
  teamName: string;
  size?: "matchCard" | "mainMatch" | "myTeam";
}

export default function TeamLogo({ teamName, size = "matchCard" }: TeamLogoProps) {
  const sizeClasses = {
    matchCard: "size-10",
    mainMatch: "size-14",
    myTeam: "size-20",
  };

  const Logo = teamLogos[teamName];

  return Logo ? <Logo className={sizeClasses[size]} /> : <Doosan className="size-14" />;
}
