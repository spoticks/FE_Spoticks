import { z } from "zod";

const fullSchema = z.object({
  username: z
    .string({
      required_error: "아이디를 입력해주세요.",
      invalid_type_error: "아이디는 문자열이어야 합니다.",
    })
    .min(5, { message: "아이디는 최소 5글자 이상이어야 합니다." })
    .max(25, { message: "아이디는 25글자 이하여야 합니다." })
    .regex(/^(?=.*[a-z])(?=.*\d)[a-z0-9]{5,25}$/, {
      message: "아이디는 소문자 영어와 숫자를 포함하여 5~25글자여야 합니다.",
    }),

  name: z
    .string({
      required_error: "이름을 입력해주세요.",
      invalid_type_error: "이름은 문자열이어야 합니다.",
    })
    .min(2, { message: "이름은 두 글자 이상이어야 합니다." })
    .regex(/^[a-zA-Z가-힣]{2,}$/, {
      message: "이름은 두 글자 이상의 한글, 영문만 입력 가능합니다.",
    }),

  phoneNumber: z
    .string({
      required_error: "전화번호를 입력해주세요.",
      invalid_type_error: "전화번호는 문자열이어야 합니다.",
    })
    .regex(/^010-\d{4}-\d{4}$/, {
      message: "유효한 번호를 입력해주세요. (예: 010-0000-0000)",
    }),

  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
      invalid_type_error: "비밀번호는 문자열이어야 합니다.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: "영문, 숫자, 특수문자 포함 최소 8자 이상이어야 합니다.",
    }),

  passwordConfirmation: z.string({
    required_error: "비밀번호를 재확인해주세요.",
    invalid_type_error: "비밀번호 확인은 문자열이어야 합니다.",
  }),
});

const signUpFormSchema = fullSchema.refine((data) => data.password === data.passwordConfirmation, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirmation"],
});

const phoneNumberSchema = fullSchema.pick({
  phoneNumber: true,
});
