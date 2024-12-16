import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/common/stores/useStore";
import { FormValueType } from "@/pages/admin/type";
import { regiSchema } from "@/pages/admin/components/RegiSchema";
import { getTeamId } from "@/common/utils/getTeamId";
import alertToast from "@/common/utils/alertToast";
import { AdminMatchType } from "@/common/types/matchTypes";
import axiosInstance from "@/common/utils/axiosInstance";

interface Props {
  mode: "create" | "edit";
  existMatch?: AdminMatchType;
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
      homeTeamName: "",
      awayTeamName: "",
    },
  });

  const handleRegi = () => {
    mode === "create" ? alertToast("등록 완료!", "success") : alertToast("수정 완료!", "success");
  };

  const onSubmit = async (data: FormValueType) => {
    try {
      const fullDateTime = `${data.date}T${data.gameStartTime}`;
      const homeTeamIdx = getTeamId(data.sport, data.homeTeamName);
      const awayTeamIdx = getTeamId(data.sport, data.awayTeamName);
      const matchData = {
        sport: data.sport,
        gameStartTime: `${fullDateTime}+09:00`, // "YYYY-MM-DDTHH:mm" 형식
        stadiumName: data.stadiumName,
        homeTeamId: homeTeamIdx,
        awayTeamId: awayTeamIdx,
      };

      if (mode === "create") {
        const res = await axiosInstance.post("/admin/games", matchData);
        addMatch(res.data);
      } else if (mode === "edit" && existMatch && existMatch.gameId !== undefined) {
        const updatedMatch = {
          ...existMatch,
          ...matchData,
        };
        const res = await axiosInstance.patch(`/admin/games/${existMatch.gameId}`, updatedMatch);
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
