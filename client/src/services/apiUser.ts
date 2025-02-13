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

export const updateUser = async (
  data: Partial<User>,
  userId: number | undefined
) => {
  const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
    method: "PATCH",
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

export const uploadAvatar = async (
  data: FormData,
  userId: number | undefined
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/user/${userId}/uploadAvatar`,
    {
      method: "POST",
      credentials: "include",
      body: data,
    }
  );

  if (!response.ok) {
    const errorData: Errors = await response.json();
    throw errorData;
  }
  const user: User = await response.json();
  return user.avatarUrl;
};

export const searchUsers = async (user: string) => {
  const res = await fetch(
    `${API_BASE_URL}/api/user/search/user?email=${user}`,
    { method: "GET", credentials: "include" }
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  const users = await res.json();
  return users;
};
