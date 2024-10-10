import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Tickets from "@/assets/Tickets.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
import { Match } from "@/common/types/type";
import axios from "axios";
import { menu, stadiums, teams } from "@/common/constants";
import SuccessToast from "@/common/components/atoms/SuccessToast";
import useStore from "@/common/stores/useStore";
import InputField from "@/pages/admin/components/InputField";
import SelectFiled from "@/pages/admin/components/SelectField";
import { FormValues } from "@/pages/admin/type";
import { regiSchema } from "./RegiSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModeProps {
  mode: "create" | "edit";
  existMatch?: Match;
}

export default function Registration() {
  const location = useLocation();
  const { mode, existMatch }: ModeProps = location.state;
  // console.log(mode, existMatch)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(regiSchema),
    defaultValues: existMatch || {
      sportName: "",
      date: "",
      gameStartTime: "",
      stadiumName: "",
      homeTeamName: "",
      awayTeamName: "",
    },
  });

  const navigate = useNavigate();
  const { addMatch, updateMatch } = useStore((state) => ({
    addMatch: state.addMatch,
    updateMatch: state.updateMatch,
  }));

  const getTeamIdx = (sportName: string, teamName: string): number => {
    const sportTeams = teams[sportName];
    if (sportTeams) {
      const idx = sportTeams.indexOf(teamName);
      return idx !== -1 ? idx + 1 : -1;
    }
    return -1;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      console.log(errors);
      const addDateTime = `${data.date}T${data.gameStartTime}`;
      const homeTeamIdx = getTeamIdx(data.sportName, data.homeTeamName);
      const awayTeamIdx = getTeamIdx(data.sportName, data.awayTeamName);

      const matchData = {
        sportName: data.sportName,
        gameStartTime: addDateTime,
        stadiumName: data.stadiumName,
        homeTeamName: homeTeamIdx.toString(),
        awayTeamName: awayTeamIdx.toString(),
      };
      if (mode === "create") {
        const res = await axios.post("http://localhost:3000/matches", matchData);
        // console.log(matchData);
        addMatch(res.data);
      } else if (mode === "edit" && existMatch) {
        // console.log(existMatch.id);
        if (existMatch.id !== undefined) {
          const updatedMatch = {
            ...existMatch,
            ...matchData,
            id: existMatch.id,
          };
          const res = await axios.patch(
            `http://localhost:3000/matches/${existMatch.id}`,
            updatedMatch,
          );
          updateMatch(res.data);
        }
      }
      handleRegi();
      navigate("/admin");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const sportValue = watch("sportName");
  const teamsInSport = sportValue ? teams[sportValue] || [] : [];
  const stadiumsInSport = sportValue ? stadiums[sportValue] || [] : [];

  useEffect(() => {
    if (mode === "create") {
      setValue("homeTeamName", "");
      setValue("awayTeamName", "");
    } else if (mode === "edit" && existMatch) {
      setValue("sportName", existMatch.sportName);
      setValue("date", existMatch.gameStartTime.split("T")[0]);
      setValue("gameStartTime", existMatch.gameStartTime.split("T")[1]);
      setValue("homeTeamName", existMatch.homeTeamName);
      setValue("awayTeamName", existMatch.awayTeamName);
    }
  }, [mode, existMatch, setValue]);

  const handleRegi = () => {
    mode === "create"
      ? SuccessToast({ title: "등록 완료!" })
      : SuccessToast({ title: "수정 완료!" });
  };

  return (
    <div className="my-5 flex w-full flex-row">
      <div className="flex-1">
        <div className="m-10 p-4">
          <div className="px-2 py-5 text-2xl font-bold">
            {mode === "create" ? "경기 등록" : "경기 수정"}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex">
              {/* 종목 선택 */}
              <SelectFiled
                label="종목"
                id="sportName"
                register={register}
                options={menu.filter((el) => el !== "HOME")}
              />

              {/* 경기일 선택 */}
              <InputField label="경기일" type="date" id="date" register={register} />
            </div>
            {errors.sportName && (
              <span className="text-[20px] text-Accent">{errors.sportName.message}</span>
            )}
            {errors.date && <span className="text-[20px] text-Accent">{errors.date.message}</span>}

            {/* 경기 시작 시간 선택 */}
            <InputField label="경기 시작 시간" type="time" id="gameStartTime" register={register} />
            {errors.gameStartTime && (
              <span className="text-[20px] text-Accent">{errors.gameStartTime.message}</span>
            )}

            {/* 장소 선택 */}
            <SelectFiled
              label="장소"
              id="stadiumName"
              register={register}
              options={stadiumsInSport}
              disabled={!sportValue}
            />
            {errors.stadiumName && (
              <span className="text-[20px] text-Accent">{errors.stadiumName.message}</span>
            )}

            {/* 홈팀 선택 */}
            <SelectFiled
              label="홈팀"
              id="homeTeamName"
              register={register}
              options={teamsInSport}
              disabled={!sportValue}
            />
            {errors.homeTeamName && (
              <span className="text-[20px] text-Accent">{errors.homeTeamName.message}</span>
            )}

            {/* 어웨이팀 선택 */}
            <div className="border-none">
              <SelectFiled
                label="어웨이팀"
                id="awayTeamName"
                register={register}
                options={teamsInSport.filter((team) => team !== watch("homeTeamName"))}
                disabled={!sportValue}
              />
              {errors.awayTeamName && (
                <span className="text-[20px] text-Accent">{errors.awayTeamName.message}</span>
              )}
            </div>
            <button type="submit" className="hover:Accent rounded bg-Accent px-4 py-2 text-white">
              {mode === "create" ? "신규 경기 등록" : "경기 수정"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-2 flex">
        <Tickets className="size-30" />
      </div>
    </div>
  );
}
