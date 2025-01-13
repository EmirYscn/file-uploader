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

export const createUser = async (data: User) => {
  console.log(data);

  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: Errors = await response.json();
    console.log(errorData);
    throw errorData;
  }

  return await response.json();
};

export const login = async (data: User): Promise<User> => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error; // Rethrow the error after logging it
  }
};
