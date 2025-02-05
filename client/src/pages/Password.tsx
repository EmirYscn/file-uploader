import { useContext } from "react";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/userContext";
import Input from "../ui/Input";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";
import { User } from "../types/models";
import Form from "../ui/Form";
import { ThemeContext } from "../contexts/themeContext";

const StyledProfile = styled.div`
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div<{ isdark?: boolean }>`
  position: relative;
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-100);

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-200);
    `}
`;

type PasswordData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

function Password() {
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordData>();
  return (
    <StyledProfile>
      <FormContainer isdark={isDark}>
        <Form onSubmit={handleSubmit(() => {})} isdark={isDark}>
          <FormRow
            label="Current Password"
            // apiError={apiErrors?.error?.find((err) => err.path === "email")?.msg}
            formError={errors?.currentPassword?.message}
          >
            <Input
              type="text"
              id="currentPassword"
              {...register("currentPassword", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="New password"
            // apiError={apiErrors?.error?.find((err) => err.path === "email")?.msg}
            formError={errors?.password?.message}
          >
            <Input
              type="text"
              id="password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm new password"
            // apiError={apiErrors?.error?.find((err) => err.path === "email")?.msg}
            formError={errors?.confirmPassword?.message}
          >
            <Input
              type="text"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </FormRow>
        </Form>
      </FormContainer>
    </StyledProfile>
  );
}

export default Password;
