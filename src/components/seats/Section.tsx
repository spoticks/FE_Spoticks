import { Controller, Control } from "react-hook-form";
import { seatFormData } from "../../type";

interface sectionOfSeats {
  seatPosition: string;
  seatPrice: number;
  availableSeat: number;
}

interface SectionSelectorProps {
  sectionData: sectionOfSeats[];
  control: Control<seatFormData>;
}

export default function SectionSelector({ sectionData, control }: SectionSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {sectionData.map((section, idx) => (
        <Controller
          key={idx}
          name="section"
          control={control}
          render={({ field }) => {
            const isSelected = field.value === section.seatPosition;
            return (
              <div
                onClick={() => {
                  field.onChange(section.seatPosition);
                }}
                className={`flex cursor-pointer flex-col items-center rounded-[10px] border border-borders bg-background px-7 py-2 font-bold ${isSelected ? "border-text-primary text-text-primary" : "text-text-tertiary"}`}
              >
                <div className="text-[24px]">{section.seatPosition}</div>
                <div className="text-[16px]">{section.seatPrice.toLocaleString()}원</div>
                <div className="text-[16px]">{section.availableSeat}/50</div>
              </div>
            );
          }}
        />
      ))}
    </div>
  );
}
