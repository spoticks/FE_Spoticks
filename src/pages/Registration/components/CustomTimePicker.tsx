import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { Dayjs } from "dayjs";
import { FormValueType } from "@/pages/Admin/type";

interface CustomTimePickerProps {
  gameStartTime: string | undefined;
  setValue: UseFormSetValue<FormValueType>;
  control: Control<FormValueType, unknown>;
}

const CustomTimePicker = ({ gameStartTime, setValue, control }: CustomTimePickerProps) => {
  const handleTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setValue("gameStartTime", newValue.format("HH:mm"));
    } else {
      setValue("gameStartTime", dayjs().format("HH:mm"));
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="gameStartTime"
        control={control}
        render={({ field }) => (
          <TimePicker
            {...field}
            value={gameStartTime ? dayjs(`2024-01-01T${gameStartTime}`) : dayjs("2024-01-01T12:00")}
            onChange={handleTimeChange}
            timeSteps={{ minutes: 10 }}
            slotProps={{
              textField: {
                sx: {
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: "15px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize: "16px",
                    height: "48px",
                    border: "none",
                  },
                },
              },
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    padding: "8px",
                    fontSize: "16px",
                    "& .MuiMenuItem-root": {
                      fontSize: "16px",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#DD4255",
                      color: "white",
                      fontSize: "16px",
                    },
                    "& .MuiButton-root": {
                      fontSize: "16px",
                      color: "#DD4255",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "#DD4255",
                        color: "white",
                      },
                    },
                  },
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
