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

  return <Logo className={sizeClasses[size]} />;
}
