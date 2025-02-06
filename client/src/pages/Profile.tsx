import { useContext, useEffect, useState } from "react";
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
import { set } from "date-fns";

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

function Profile() {
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileData>();

  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<Errors | null>(null);

  useEffect(() => {
    if (user) {
      setValue("email", user.email || "");
      setValue("username", user.username || "");
    }
  }, [user, setValue]);

  async function onSubmit(data: User) {
    // Filter only changed fields
    if (!user) return;

    // Get only changed fields
    const updatedFields = Object.keys(data).reduce((acc, key) => {
      const fieldKey = key as keyof User;
      const newValue = data[fieldKey];
      const oldValue = user[fieldKey];

      // Only add fields that have changed and are not undefined
      if (newValue !== oldValue && newValue !== undefined) {
        return { ...acc, [fieldKey]: newValue };
      }
      return acc;
    }, {} as Partial<User>);

    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected");
      return; // Prevent unnecessary API call if nothing changed
    }

    console.log("Updated fields:", updatedFields);
    try {
      setIsLoading(true);
      console.log(updatedFields);
      await updateUser(updatedFields, user?.id);
      setIsEdited(false);
    } catch (error: any) {
      setApiErrors(error);
      setIsEdited(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <StyledProfile>
      <FormContainer isdark={isDark}>
        <Form onSubmit={handleSubmit(onSubmit)} isdark={isDark}>
          <FormRow
            label="Email"
            apiError={
              apiErrors?.errors?.find((err) => err.path === "email")?.msg
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
              onChange={() => setIsEdited(true)}
            />
          </FormRow>
          <FormRow
            label="Username"
            // apiError={apiErrors?.error?.find((err) => err.path === "email")?.msg}
            formError={errors?.username?.message}
          >
            <Input
              type="text"
              id="username"
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Username must be at least 3 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters long",
                },
              })}
              onChange={() => setIsEdited(true)}
            />
          </FormRow>

          {isEdited && (
            <FormRow>
              <Button
                styletype="form-button-cancel"
                onClick={() => {
                  reset({
                    email: user?.email || "",
                    username: user?.username || "",
                  });
                  setIsEdited(false);
                }}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                styletype="form-button-submit"
                disabled={isLoading}
              >
                Done
              </Button>
            </FormRow>
          )}
        </Form>
      </FormContainer>
    </StyledProfile>
  );
}

export default Profile;
