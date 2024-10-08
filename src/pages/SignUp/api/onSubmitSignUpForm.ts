import { AuthFormType } from "@/common/types/formTypes";
import { SubmitHandler } from "react-hook-form";

const onSubmitSignUpForm: SubmitHandler<AuthFormType> = (data) => {
  const { passwordConfirmation, ...formData } = data;
  // 회원가입 양식 제출 로직
  console.log(passwordConfirmation, formData);
};

export default onSubmitSignUpForm;
