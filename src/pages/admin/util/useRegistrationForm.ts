import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useStore from "@/common/stores/useStore";
import { FormValueType } from "@/pages/admin/type";
import { regiSchema } from "@/pages/admin/components/RegiSchema";
import { getTeamId } from "@/common/utils/getTeamId";
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

  const handleRegi = () => {
    mode === "create" ? alertToast("등록 완료!", "success") : alertToast("수정 완료!", "success");
  };

  const onSubmit = async (data: FormValueType) => {
    try {
      const fullDateTime = `${data.date}T${data.gameStartTime}`;
      const homeTeamIdx = getTeamId(data.sport, data.homeTeam);
      const awayTeamIdx = getTeamId(data.sport, data.awayTeam);
      console.log(homeTeamIdx, awayTeamIdx);
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
