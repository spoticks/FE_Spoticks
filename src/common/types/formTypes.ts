export interface AuthFormType {
  userName: string;
  memberName: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}

export type AccountDeletionFormType = Pick<AuthFormType, "password"> & { reason: string };
export type LoginFormType = Pick<AuthFormType, "userName" | "password">;
export type PasswordSettingFormType = Pick<AuthFormType, "password"> & {
  originalPassword: string;
  passwordConfirmation: string;
};

export type InputType = "text" | "email" | "password" | "date" | "time";

export type BasicInformation = Pick<AuthFormType, "memberName" | "phoneNumber">;
export type UserInformation = BasicInformation & { id: string; userName: string };
