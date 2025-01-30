import styled, { css } from "styled-components";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { User } from "../types/models";
import Button from "../ui/Button";
import Wall from "../ui/Wall";
import { createUser } from "../services/apiUser";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import BackButton from "../ui/BackButton";
import { ThemeContext } from "../contexts/themeContext";

const StyledSignup = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
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

type SignupData = User & { confirmPassword: string };

function Signup() {
  const { isDark } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignupData>();

  const { onSubmit, errors: apiErrors, isLoading } = useCreateUser();
  console.log(apiErrors);
  console.log(apiErrors?.error?.find((err) => err.path === "email"));
  return (
    <>
      <StyledSignup>
        <Wall isDark={isDark} />
        <FormContainer isdark={isDark}>
          <BackButton posContext="signup" />
          <Form onSubmit={handleSubmit(onSubmit)} isdark={isDark}>
            <FormRow>
              <h1>Sign Up</h1>
            </FormRow>
            <FormRow
              label="Email"
              apiError={
                apiErrors?.error?.find((err) => err.path === "email")?.msg
              }
              formError={errors?.email?.message}
            >
              <Input
                type="text"
                id="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </FormRow>
            <FormRow
              label="Username"
              apiError={
                apiErrors?.error?.find((err) => err.path === "username")?.msg
              }
              formError={errors?.username?.message}
            >
              <Input
                type="text"
                id="username"
                {...register("username", {
                  required: "This field is required",
                  minLength: 2,
                  maxLength: 30,
                })}
              />
            </FormRow>
            <FormRow
              label="Password"
              apiError={
                apiErrors?.error?.find((err) => err.path === "password")?.msg
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
              label="Confirm Password"
              apiError={
                apiErrors?.error?.find((err) => err.path === "confirmPassword")
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
              <Button styletype="form-button-submit" disabled={isLoading}>
                Submit
              </Button>
            </FormRow>
          </Form>
        </FormContainer>
      </StyledSignup>
    </>
  );
}

export default Signup;
