import { useState } from "react";
import { useNavigate } from "react-router";

import { createUser } from "../services/apiUser";

import { User } from "../types/models";

type SignupData = User & { confirmPassword: string };

type Error = {
  location?: string;
  msg?: string;
  path?: string;
  type?: string;
  value?: string;
};

type Errors = {
  body?: SignupData;
  error?: Error[];
};

function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const navigate = useNavigate();

  async function onSubmit(data: SignupData) {
    try {
      setIsLoading(true);
      await createUser(data);

      navigate("/login");
    } catch (error: any) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, errors, isLoading };
}

export default useCreateUser;
