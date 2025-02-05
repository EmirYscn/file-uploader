import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { User } from "../types/models";

import { login } from "../services/apiUser";

import { UserContext } from "../contexts/userContext";

type loginData = User;

type Errors = {
  body?: loginData;
  error?: string;
};

function useLoginUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function onSubmit(data: User) {
    console.log(data);
    try {
      setIsLoading(true);
      const user = await login(data);

      setUser(user);
      navigate("/all");
    } catch (error: any) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  }
  return { onSubmit, errors, isLoading };
}

export default useLoginUser;
