import { useEffect } from "react";
import Tickets from "@/assets/Tickets.svg?react";
import { useLocation } from "react-router-dom";
import { AdminMatchType } from "@/common/types/matchTypes";
import { menu, stadiums, teams } from "@/common/constants";
import SelectFiled from "@/pages/admin/components/ui/SelectField";
import FormInputField from "@/common/components/molecules/FormInputField";
import { useRegistrationForm } from "../api/useRegistration";

interface ModeProps {
  mode: "create" | "edit";
  existMatch?: AdminMatchType;
}

export default function Registration() {
  const location = useLocation();
  const { mode, existMatch }: ModeProps = location.state || { mode: "create" };
  const { register, handleSubmit, watch, setValue, errors, onSubmit } = useRegistrationForm({
    mode,
    existMatch,
  });

  const sportValue = watch("sport");
  const teamsInSport = sportValue ? teams[sportValue] || [] : [];
  const stadiumsInSport = sportValue ? stadiums[sportValue] || [] : [];
  console.log(existMatch);
  useEffect(() => {
    if (mode === "edit" && existMatch) {
      setValue("sport", existMatch.sport);
      setValue("date", existMatch.gameStartTime.split("T")[0]); // 날짜 설정
      setValue("gameStartTime", existMatch.gameStartTime.split("T")[1]); // 시간 설정
      setValue("homeTeamName", existMatch.homeTeamName);
      setValue("awayTeamName", existMatch.awayTeamName);
      setValue("stadiumName", existMatch.stadiumName);
    }
  }, [mode, existMatch, setValue]);

  return (
    <div className="my-5 flex w-full flex-row">
      <div className="flex-1">
        <div className="m-10 p-4">
          <div className="px-2 py-5 text-2xl font-bold">
            {mode === "create" ? "경기 등록" : "경기 수정"}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2">
              {/* 종목 선택 */}
              <SelectFiled
                label="종목"
                id="sport"
                register={register}
                options={menu.filter((el) => el !== "HOME")}
                error={errors.sport}
              />
              {/* 경기일 선택 */}
              <FormInputField
                label="경기일"
                register={register("date")}
                error={errors.date}
                inputType="date"
                isLabelRequired
              />
            </div>

            {/* 경기 시작 시간 선택 */}
            <FormInputField
              label="경기 시작 시간"
              register={register("gameStartTime")}
              error={errors.gameStartTime}
              inputType="time"
              isLabelRequired
            />

            {/* 장소 선택 */}
            <SelectFiled
              label="장소"
              id="stadiumName"
              register={register}
              options={stadiumsInSport}
              disabled={!sportValue}
              error={errors.stadiumName}
            />

            {/* 홈팀 선택 */}
            <SelectFiled
              label="홈팀"
              id="homeTeamName"
              register={register}
              options={teamsInSport}
              disabled={!sportValue}
              error={errors.homeTeamName}
            />
            {/* 어웨이팀 선택 */}
            <div className="border-none">
              <SelectFiled
                label="어웨이팀"
                id="awayTeamName"
                register={register}
                options={teamsInSport.filter((team) => team !== watch("homeTeamName"))}
                disabled={!sportValue}
                error={errors.awayTeamName}
              />
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
