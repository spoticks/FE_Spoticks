import { object, string, z } from "zod";

// 비밀번호와 비밀번호 확인이 일치하는지 검증하는 스키마
const passwordMatchSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });
