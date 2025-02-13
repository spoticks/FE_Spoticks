import Spinner from "@/assets/spinner.svg?react";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Spinner />
      <h3>로딩중입니다.</h3>
    </div>
  );
}
