import { AuthFormType, PasswordSettingFormType } from "@/common/types/formTypes";

const validationRules = {
  username: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "유효한 이메일 형식을 입력해주세요.",
    },
  },
  name: {
    required: "이름을 입력해주세요.",
    pattern: {
      value: /^[a-zA-Z가-힣]{2,}$/,
      message: "이름은 두 글자 이상의 한글, 영문만 입력 가능합니다.",
    },
  },
  phoneNumber: {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: /^010-\d{4}-\d{4}$/,
      message: "유효한 번호를 입력해주세요. (예: 010-0000-0000)",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    pattern: {
      value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
      message: "영문, 숫자, 특수문자 포함 최소 8자 이상이어야 합니다.",
    },
  },
  passwordConfirmation: {
    required: "비밀번호를 재확인해주세요.",
    validate: (value: string, getValues: () => AuthFormType | PasswordSettingFormType) =>
      value === getValues().password || "비밀번호가 일치하지 않습니다.",
  },
};

export default validationRules;
