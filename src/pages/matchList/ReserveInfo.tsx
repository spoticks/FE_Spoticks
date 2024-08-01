const ReserveInfo = () => {
  return(
    <div className="p-2 leading-relaxed">
      <h1 className="text-lg font-semibold">예매안내</h1>
        <h5 className="text-sm">1. 예매 가능시간 : 경기당일 경기시작 1시간 후까지</h5>
        <h5 className="text-sm">2. 예매티켓 취소 가능시간 : 경기당일 경기시간 4시간 전까지</h5>
        <h6 className="text-xs">*부분취소는 불가합니다. 기존 예매 건을 전체취소 후 재예매를 진행해야 하며, 취소 후 기존 좌석에 대한 선점은 보장되지 않습니다.</h6>
        <h5 className="text-sm">3. 현장 매표소 운영시간 : 평일 경기 시작 1시간 30분 전 / 주말,공휴일 경기 시작 2시간 전 시작 (변경 시 별도 공지)</h5>
        <h5 className="text-sm">4. 예매정책</h5>
        <h6 className="text-xs">*매수제한 : 1회 4매</h6>
        <h6 className="text-xs">*예매수수료 : 장당 1,000원</h6>
        <h6 className="text-xs">*문화누리카드의 부정이용 적발시 처벌의 대상이 될 수 있습니다.</h6>
        <h6 className="text-xs">*무통장입금은 예매 당일 자정까지 입금하지 않으면 자동 취소됩니다.</h6>
        <h6 className="text-xs">*무통장입금은 경기일 기준 2일 전까지 사용 가능합니다.</h6>
        <h6 className="text-xs text-[#dd4255]">*익사이팅 존 안내</h6>
        <h6 className="text-xs">익사이팅석은 안정상 문제로 초등학생까지는 관람 불가합니다. (보호자 동반시에도 입장불가)</h6>
        <h6 className="text-xs">*군인 할인은 휴가증을 기준으로 할인 적용 됩니다.</h6>
        <h6 className="text-xs">간부(부사관/장교/ 후보생 포함)의 경우 할인 적용이 불가할 수 있습니다.</h6>
        <h6 className="text-xs text-[#dd4255]">*우천 취소 안내</h6>
        <h6 className="text-xs">- 우천 취소 확정 시, 예매내역은 익일 전액환불 및 일괄취소 처리됩니다. (주말 경기 취소 시, 차주 월요일 취소 처리됨)</h6>
        <h6 className="text-xs">- 우천 취소 확정 전, 예매자 판단에 의한 취소 건은 취소 수수료 환불이 불가합니다. (임의판단에 의한 선 취소 건은 취소 수수료 부과됨)</h6>
        <h6 className="text-xs text-[#dd4255]">*사석방지 기능 활성화 안내</h6>
        <h6 className="text-xs">- 사석방지 기능 : 타인이 예매를 하지 못하도록 1자리를 남겨두고 좌석을 선택할 경우, 예매 불가능한 기능</h6>
        <h6 className="text-xs">- 남아있는 좌석 중, 끝 1자리만 남겨두면 예매불가</h6>
        <h6 className="text-xs">- 중간 1자리를 띄우면 예매불가</h6>
        <h1 className="text-lg font-semibold py-2">티켓수령 및 입장</h1>
        <h5 className="text-sm">1. 경기당일 매표소가 혼잡하오니, 가급적 모바일티켓을 활용하여 편안한 입장을 권장드립니다.</h5>
        <h6 className="text-xs">*모바일 티켓은 바로 출입구에서 입장이 가능합니다.</h6>
        <h6 className="text-xs">*모바일 티켓 캡쳐 혹은 이미지는 입장 불가(어플에서 예약번호 혹은 바코드가 실시간으로 움직이는 티켓만 입장가능)</h6>
        <h6 className="text-xs">*모바일 티켓으로 티켓선물하기 기능 사용하여 티켓을 선물한 경우 취소 불가(선물한 티켓이 반납된 이후 취소가능)</h6>
        <h5 className="text-sm">2. 본인확인이 힘들 경우, 입장권 교환이 불가할 수 있습니다.</h5>
        <h5 className="text-sm">3. 경기 당일 주차장이 협소하여 사용이 불가할 수 있으니, 가능하면 대중교통 이용 바랍니다.</h5>
        <h6 className="text-xs">(주차장 이용 불가로 인한 경기 티켓 교환,환불은 불가합니다)</h6>
        <h5 className="text-sm">4. 예매하신 티켓의 전매, 위조 등의 위법행위를 엄격히 금지합니다.</h5>
        <h6 className="text-xs">* 티켓 예매 후 타인에게 재판매하거나 양도/양수 과정에서 예매자의 신상정보를 타인에게 임의로 전달시에는 판매자와 구매자 모두 피해를 입을 수 있습니다. 이로 인한 피해에 대해서는 구단과 구단과 계약된 티켓판매 업체는 일절 책임지지 않습니다.</h6>
      </div>
  )
}

export default ReserveInfo;