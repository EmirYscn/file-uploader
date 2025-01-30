import styled, { css } from "styled-components";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { User } from "../types/models";
import { login } from "../services/apiUser";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import Wall from "../ui/Wall";
import Button from "../ui/Button";
import useLoginUser from "../hooks/useLoginUser";
import { ThemeContext } from "../contexts/themeContext";

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;

const FormContainer = styled.div<{ isdark?: boolean }>`
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

function Login() {
  const { isDark } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const { onSubmit, errors: apiErrors, isLoading } = useLoginUser();
  console.log(apiErrors);

  return (
    <StyledLogin>
      <Wall isDark={isDark} />
      <FormContainer isdark={isDark}>
        <Form onSubmit={handleSubmit(onSubmit)} isdark={isDark}>
          <FormRow>
            <h1>Log In</h1>
          </FormRow>
          <FormRow
            label="Email"
            apiError={apiErrors?.error}
            formError={errors?.email?.message}
          >
            <Input
              type="text"
              id="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="password" formError={errors?.password?.message}>
            <Input
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow>
            <Button type="submit" styletype="form-button-submit">
              Login
            </Button>
          </FormRow>
        </Form>
      </FormContainer>
    </StyledLogin>
  );
}

export default Login;
