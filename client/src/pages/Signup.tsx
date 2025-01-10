import styled from "styled-components";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { User } from "../types/models";
import Button from "../ui/Button";
import Wall from "../ui/Wall";

const StyledSignup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
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
  const { register, handleSubmit, getValues, reset } = useForm<SignupData>();
  function onSubmit(data: SignupData) {
    console.log(data);
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <StyledSignup>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow>
            <h1>Sign Up</h1>
          </FormRow>
          <FormRow label="Email">
            <Input
              type="text"
              id="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Username">
            <Input
              type="text"
              id="username"
              {...register("username", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Password">
            <Input
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Confirm Password">
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
            <Button type="form-button-cancel" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="form-button-submit">Submit</Button>
          </FormRow>
        </Form>
      </FormContainer>
      <Wall />
    </StyledSignup>
  );
}

export default Signup;
