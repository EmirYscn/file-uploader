import styled from "styled-components";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { User } from "../types/models";
import Button from "../ui/Button";
import Wall from "../ui/Wall";
import { createUser } from "../services/apiUser";
import { useNavigate } from "react-router";
import { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";

const StyledSignup = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;

const FormContainer = styled.div`
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-100);
`;

type SignupData = User & { confirmPassword: string };

function Signup() {
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
    <StyledSignup>
      <Wall />
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <h1>Sign Up</h1>
          </FormRow>
          <FormRow label="Email">
            <>
              <Input
                type="text"
                id="email"
                {...register("email", {
                  required: "This field is required",
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
              {apiErrors?.error?.find((err) => err.path === "email") && (
                <p>
                  {apiErrors?.error?.find((err) => err.path === "email")?.msg}
                </p>
              )}
            </>
          </FormRow>
          <FormRow label="Username">
            <>
              <Input
                type="text"
                id="username"
                {...register("username", {
                  required: "This field is required",
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
              {apiErrors?.error?.find((err) => err.path === "username") && (
                <p>
                  {
                    apiErrors?.error?.find((err) => err.path === "username")
                      ?.msg
                  }
                </p>
              )}
            </>
          </FormRow>
          <FormRow label="Password">
            <>
              <Input
                type="password"
                id="password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              {apiErrors?.error?.find((err) => err.path === "password") && (
                <p>
                  {
                    apiErrors?.error?.find((err) => err.path === "password")
                      ?.msg
                  }
                </p>
              )}
            </>
          </FormRow>
          <FormRow label="Confirm Password">
            <>
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
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
              {apiErrors?.error?.find(
                (err) => err.path === "confirmPassword"
              ) && (
                <p>
                  {
                    apiErrors?.error?.find(
                      (err) => err.path === "confirmPassword"
                    )?.msg
                  }
                </p>
              )}
            </>
          </FormRow>
          {/* {apiErrors && apiErrors.errors && (
            <FormRow>
              <p>{apiErrors.errors.join(", ")}</p>
            </FormRow>
          )} */}
          <FormRow>
            <Button
              styletype="form-button-cancel"
              disabled={isLoading}
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button styletype="form-button-submit" disabled={isLoading}>
              Submit
            </Button>
          </FormRow>
        </Form>
      </FormContainer>
    </StyledSignup>
  );
}

export default Signup;
