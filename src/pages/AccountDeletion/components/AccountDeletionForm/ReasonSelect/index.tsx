import InputLabel from "@/components/UserInfo/InputLabel";
import usePopover from "@/hooks/usePopover";
import DropdownButton from "@/pages/AccountDeletion/components/AccountDeletionForm/ReasonSelect/DropdownButton";
import DropdownOptions from "@/pages/AccountDeletion/components/AccountDeletionForm/ReasonSelect/DropdownOptions";
import { AccountDeletionFormType } from "@/common/types/formTypes";
import { Control, Controller } from "react-hook-form";

export default function ReasonSelect({ control }: { control: Control<AccountDeletionFormType> }) {
  const {
    handleClickProfile: handleClickOptions,
    isPopoverOpen: isOpen,
    setIsPopoverOpen: setIsOpen,
    popoverRef: optionRef,
  } = usePopover();

  return (
    <>
      <InputLabel label="무엇이 불편하셨나요?" />
      <Controller
        name="reason"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <div className="relative">
            <DropdownButton
              onClick={(e) => {
                handleClickOptions(e);
                if (isOpen) {
                  field.onChange("");
                }
              }}
              isOpen={isOpen}
              label={field.value || "무엇이 불편하셨나요?"}
            />
            {isOpen && (
              <DropdownOptions
                onClick={(option) => {
                  field.onChange(option);
                  setIsOpen(false);
                }}
                optionRef={optionRef}
              />
            )}
          </div>
        )}
      />
    </>
  );
}
