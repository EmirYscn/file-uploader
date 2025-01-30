import { useNavigate } from "react-router";
import { login } from "../services/apiUser";
import { User } from "../types/models";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";

type loginData = User;

// type Error = {
//   location?: string;
//   msg?: string;
//   path?: string;
//   type?: string;
//   value?: string;
// };

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

      console.log(user);
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
