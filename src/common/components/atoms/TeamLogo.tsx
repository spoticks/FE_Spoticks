import hanhwa from "../assets/baseballTeam/hanhwa_eagles.svg";
import lg from "../assets/baseballTeam/lg-twins.svg";
import kt from "../assets/baseballTeam/kt-wiz.svg";
import ssg from "../assets/baseballTeam/ssg-landers.svg";
import nc from "../assets/baseballTeam/nc-dinos.svg";
import doosan from "../assets/baseballTeam/doosan-bears.svg";
import kia from "../assets/baseballTeam/kia-tigers.svg";
import lotte from "../assets/baseballTeam/lotte-giants.svg";
import kiwoom from "../assets/baseballTeam/kiwoom-heros.svg";
import samsung from "../assets/baseballTeam/samsung-lions.svg";

const teamLogos: Record<string, string> = {
  "한화 이글스": hanhwa,
  "LG 트윈스": lg,
  "KT 위즈": kt,
  "SSG 랜더스": ssg,
  "NC 다이노스": nc,
  "두산 베어스": doosan,
  "KIA 타이거즈": kia,
  "롯데 자이언츠": lotte,
  "키움 히어로즈": kiwoom,
  "삼성 라이온즈": samsung,
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

  const logoSrc = teamLogos[teamName];

  return <img src={logoSrc} alt={teamName} className={sizeClasses[size]} />;
}
