import { useNavigate } from "react-router";
import { createUser } from "../services/apiUser";
import { useState } from "react";
import { User } from "../types/models";

type SignupData = User & { confirmPassword: string };

function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function onSubmit(data: SignupData) {
    try {
      setIsLoading(true);
      await createUser(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function onError(errors) {
    console.log(errors);
  }

  return { onSubmit, onError, isLoading };
}

export default useCreateUser;
