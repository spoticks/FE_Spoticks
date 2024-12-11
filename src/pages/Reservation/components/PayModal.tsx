import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Error from "../../ErrorPage";
import { MatchDataProps } from "../../../common/types/matchTypes";
import { useNavigate } from "react-router-dom";
import Button from "@/common/components/atoms/Button";
import Loading from "@/common/components/atoms/Loading";
import alertToast from "@/common/utils/alertToast";
import DetailedTicket from "@/common/components/organisms/DetailedTicket";
import InfoPart from "@/common/components/molecules/InfoPart";

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId?: number;
  mySeats: string[];
  matchData: MatchDataProps;
  totalPay: string;
}

interface PayFormInputs {
  totalPrice: string;
  seatIds: string[];
}

export default function PayModal({
  isOpen,
  onClose,
  gameId,
  mySeats,
  matchData,
  totalPay,
}: PayModalProps) {
  const navigate = useNavigate();

  const fetchPayDetails = async ({ totalPrice, seatIds }: PayFormInputs) => {
    // http://localhost:3000/games/${gameId}/reserve
    const { data } = await axios.post(`http://localhost:3000/pay`, {
      totalPrice,
      seatIds,
    });
    return data;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => fetchPayDetails({ totalPrice: totalPay, seatIds: mySeats }),
    onSuccess: (data) => {
      console.log("Reservation successful:", data);
      onClose();
      alertToast("결제 완료!", "success");
      navigate("/");
    },
    onError: (error) => {
      console.error("Reservation failed:", error);
    },
  });

  const handlePayClick = () => {
    mutate();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed left-1/2 top-1/2 flex min-h-[771px] w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[30px] border border-borders bg-foreground p-[40px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
    >
      <div className="mb-5 flex w-full justify-between border-b border-b-borders pb-1">
        <h1 className="font-semibold">선택 정보</h1>
        <button onClick={onClose}>
          <IoIosCloseCircle className="size-5 text-borders transition-all duration-150 hover:text-black" />
        </button>
      </div>
      <section>
        {isPending && <Loading />}
        {/* {error && <Error />} */}
        {matchData && (
          <>
            <DetailedTicket data={matchData} mySeats={mySeats} totalPay={totalPay} />
            <div className="flex w-[380px] flex-col gap-4">
              <div className="flex justify-between">
                <InfoPart heading="연락처" content={"010-1234-5678"} />
                <InfoPart heading="예매자" content={"홍길동"} isRight />
              </div>
              <div className="flex">
                <InfoPart heading="좌석" content={mySeats.join(", ")} isSeat />
              </div>
              <Button content={"결제하기"} onClick={handlePayClick} />
            </div>
          </>
        )}
      </section>
    </Modal>
  );
}
