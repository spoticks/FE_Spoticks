import { z } from "zod";

const fullSchema = z.object({
  userName: z
    .string()
    .min(5, { message: "아이디는 최소 5글자 이상이어야 합니다." })
    .max(25, { message: "아이디는 25글자 이하여야 합니다." })
    .regex(/^(?=.*[a-z])(?=.*\d)[a-z0-9]{5,25}$/, {
      message: "아이디는 소문자 영어와 숫자를 포함하여 5~25글자여야 합니다.",
    }),

  memberName: z
    .string()
    .min(2, { message: "이름은 두 글자 이상이어야 합니다." })
    .max(12, { message: "이름은 최대 12글자 까지 입니다!" })
    .regex(/^[a-zA-Z가-힣]{2,12}$/, {
      message: "이름은 2~12 글자의 한글, 영문만 입력 가능합니다.",
    }),

  phoneNumber: z
    .string()
    .length(11, "11자리 번호를 입력해주세요!")
    .regex(/^010\d{8}$/, {
      message: "010 으로 시작하는 번호를 입력해주세요 (예: 01012345678)",
    }),

  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8글자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20글자 이하여야 합니다." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
      message: "영문, 숫자, 특수문자(@, $, !, %, *, #, ?, &) 포함 8~20글자여야 합니다.",
    }),

  passwordConfirmation: z.string(),
});

const signUpFormSchema = fullSchema.refine((data) => data.password === data.passwordConfirmation, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirmation"],
});

const passwordSchema = z.object({ password: fullSchema.shape.password, reason: z.string() });

const passwordSettingSchema = z
  .object({
    password: fullSchema.shape.password,
    newPassword: fullSchema.shape.password,
    newPasswordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "새 비밀번호와 일치하지 않습니다.",
    path: ["newPasswordConfirmation"],
  })
  .refine((data) => data.newPassword !== data.password, {
    message: "이전 비밀번호와 동일한 비밀번호 입니다.",
    path: ["newPassword"],
  });

const loginFormSchema = fullSchema.pick({
  userName: true,
  password: true,
});

const phoneNumberSchema = fullSchema.pick({
  phoneNumber: true,
});

export {
  signUpFormSchema,
  passwordSettingSchema,
  loginFormSchema,
  phoneNumberSchema,
  passwordSchema,
};
