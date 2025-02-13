import { User } from "../types/models";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

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
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: Errors = await response.json();
    throw errorData;
  }

  return await response.json();
};

export const login = async (data: User): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: Errors = await response.json();
    throw errorData;
  }

  return await response.json();
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Failed to log out user:", error);
    throw error;
  }
};

export const verify = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to log out user:", error);
    throw error;
  }
};
