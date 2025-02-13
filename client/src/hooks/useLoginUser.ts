import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { User } from "../types/models";

import { AuthContext } from "../contexts/authContext";
import { login } from "../services/apiAuth";

type loginData = User;

type Errors = {
  body?: loginData;
  error?: string;
};

function useLoginUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  async function onSubmit(data: User) {
    try {
      setIsLoading(true);
      const user = await login(data);

      setAuth({ isAuthenticated: true, user: user });
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
