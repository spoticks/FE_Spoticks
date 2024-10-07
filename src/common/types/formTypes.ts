export interface AuthFormType {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
}

export type AccountDeletionFormType = Pick<AuthFormType, "password"> & { reason: string };
export type LoginFormType = Pick<AuthFormType, "email" | "password">;
export type PasswordSettingFormType = Pick<AuthFormType, "password"> & {
  originalPassword: string;
  passwordConfirmation: string;
};

export type InputType = "text" | "email" | "password";

export type BasicInformation = Pick<AuthFormType, "name" | "phoneNumber">;
export type UserInformation = BasicInformation & { id: string; userName: string };
