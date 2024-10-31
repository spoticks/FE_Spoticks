import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useStore from "@/common/stores/useStore";
import { FormValueType } from "@/pages/admin/type";
import { regiSchema } from "@/pages/admin/components/RegiSchema";
import { teams } from "@/common/constants";
import alertToast from "@/common/utils/alertToast";
import { ContentProps } from "@/common/types/type";

interface Props {
  mode: "create" | "edit";
  existMatch?: ContentProps;
}

export const useRegistrationForm = ({ mode, existMatch }: Props) => {
  const navigate = useNavigate();
  const { addMatch, updateMatch } = useStore((state) => ({
    addMatch: state.addMatch,
    updateMatch: state.updateMatch,
  }));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValueType>({
    resolver: zodResolver(regiSchema),
    defaultValues: existMatch || {
      sport: "",
      date: "",
      gameStartTime: "",
      stadiumName: "",
      homeTeam: "",
      awayTeam: "",
    },
  });

  const getTeamIdx = (sport: string, team: string): number => {
    const sportTeams = teams[sport];
    if (!sportTeams) return -1;

    const idx = sportTeams.indexOf(team);
    if (idx === -1) return -1;

    let offset = 0;
    switch (sport) {
      case "축구": //1-19
        offset = 1;
        break;
      case "야구": //20-39
        offset = 20;
        break;
      case "농구": //40-49
        offset = 40;
        break;
      case "배구": //50-59
        offset = 50;
        break;
      default:
        return -1;
    }

    return offset + idx;
  };

  const handleRegi = () => {
    mode === "create" ? alertToast("등록 완료!", "success") : alertToast("수정 완료!", "success");
  };

  const onSubmit = async (data: FormValueType) => {
    try {
      console.log("Form data:", data);
      const fullDateTime = `${data.date}T${data.gameStartTime}`;
      const homeTeamIdx = getTeamIdx(data.sport, data.homeTeam);
      const awayTeamIdx = getTeamIdx(data.sport, data.awayTeam);

      const matchData = {
        sport: data.sport,
        gameStartTime: fullDateTime, // "YYYY-MM-DDTHH:mm" 형식
        stadiumName: data.stadiumName,
        homeTeamId: homeTeamIdx,
        awayTeamId: awayTeamIdx,
      };

      if (mode === "create") {
        const res = await axios.post("http://spoticks.shop:8080/admin/games", matchData);
        addMatch(res.data);
      } else if (mode === "edit" && existMatch && existMatch.gameId !== undefined) {
        const updatedMatch = {
          ...existMatch,
          ...matchData,
        };
        const res = await axios.patch(
          `http://spoticks.shop:8080/admin/games/${existMatch.gameId}`,
          updatedMatch,
        );
        updateMatch(res.data);
      }
      console.log(matchData);
      handleRegi();
      navigate("/admin");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    onSubmit,
  };
};
