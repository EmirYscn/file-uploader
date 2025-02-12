import { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { UserContext } from "../contexts/userContext";
import Input from "../ui/Input";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";
import { User } from "../types/models";
import Form from "../ui/Form";
import { ThemeContext } from "../contexts/themeContext";
import Button from "../ui/Button";
import { updateUser } from "../services/apiUser";
import { AuthContext } from "../contexts/authContext";

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

type Error = {
  location?: string;
  msg?: string;
  path?: string;
  type?: string;
  value?: string;
};

type Errors = {
  // body?: ProfileData;
  errors?: Error[];
};

function Password() {
  // const { user } = useContext(UserContext);
  const {
    auth: { user },
  } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<PasswordData>();
  // const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<Errors | null>(null);

  async function onSubmit(data: PasswordData) {
    if (!user) return;

    console.log("Updated fields:", data);
    try {
      setIsLoading(true);
      console.log(data);
      await updateUser(data, user?.id);
      reset();
    } catch (error: any) {
      setApiErrors(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledProfile>
      <FormContainer isdark={isDark}>
        <Form onSubmit={handleSubmit(onSubmit)} isdark={isDark}>
          <FormRow
            label="Current Password"
            apiError={
              apiErrors?.errors?.find((err) => err.path === "currentPassword")
                ?.msg
            }
            formError={errors?.currentPassword?.message}
          >
            <Input
              type="password"
              id="currentPassword"
              {...register("currentPassword")}
            />
          </FormRow>
          <FormRow
            label="New password"
            apiError={
              apiErrors?.errors?.find((err) => err.path === "password")?.msg
            }
            formError={errors?.password?.message}
          >
            <Input
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
                minLength: 8,
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm new password"
            apiError={
              apiErrors?.errors?.find((err) => err.path === "confirmPassword")
                ?.msg
            }
            formError={errors?.confirmPassword?.message}
          >
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password ||
                  "Password and Confirm Password must match",
              })}
            />
          </FormRow>

          <FormRow>
            {/* <Button
              styletype="form-button-cancel"
              onClick={() => reset()}
              disabled={isLoading}
            >
              Reset
            </Button> */}
            <Button
              type="submit"
              styletype="form-button-submit"
              disabled={isLoading}
            >
              Done
            </Button>
          </FormRow>
        </Form>
      </FormContainer>
    </StyledProfile>
  );
}

export default Password;
