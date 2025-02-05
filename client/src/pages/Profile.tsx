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

type ProfileData = User & { confirmPassword: string };

function Profile() {
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProfileData>();
  return (
    <StyledProfile>
      <FormContainer isdark={isDark}>
        <Form onSubmit={handleSubmit(() => {})} isdark={isDark}>
          <FormRow
            label="Email"
            // apiError={apiErrors?.error?.find((err) => err.path === "email")?.msg}
            formError={errors?.email?.message}
          >
            <Input
              type="text"
              id="email"
              defaultValue={user?.email}
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
            // apiError={apiErrors?.error?.find((err) => err.path === "email")?.msg}
            formError={errors?.email?.message}
          >
            <Input
              type="text"
              id="username"
              defaultValue={user?.username}
              {...register("username", {
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

export default Profile;
