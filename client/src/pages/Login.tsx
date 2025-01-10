import styled from "styled-components";
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

const StyledLogin = styled.div`
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

function Login() {
  const { register, handleSubmit, reset } = useForm<User>();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function onSubmit(data: User) {
    try {
      const user = await login(data);
      setUser(user);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  function onError() {}

  return (
    <StyledLogin>
      <Wall />
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow>
            <h1>Log In</h1>
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
          <FormRow label="password">
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
