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

// export const createUser = async (data: User) => {
//   const response = await fetch("/api/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const errorData: Errors = await response.json();
//     throw errorData;
//   }

//   return await response.json();
// };

// export const login = async (data: User): Promise<User> => {
//   const response = await fetch("/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const errorData: Errors = await response.json();
//     throw errorData;
//   }

//   return await response.json();
// };

// export const logout = async () => {
//   try {
//     const response = await fetch("/api/logout", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.error || `HTTP error! status: ${response.status}`
//       );
//     }
//   } catch (error) {
//     console.error("Failed to log out user:", error);
//     throw error;
//   }
// };

export const updateUser = async (
  data: Partial<User>,
  userId: number | undefined
) => {
  const response = await fetch(`/api/user/${userId}`, {
    method: "PATCH",
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
  const response = await fetch(`/api/user/${userId}/uploadAvatar`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    const errorData: Errors = await response.json();
    throw errorData;
  }
  const user: User = await response.json();
  return user.avatarUrl;
};

export const searchUsers = async (user: string) => {
  const res = await fetch(`/api/user/search/user?email=${user}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  const users = await res.json();
  return users;
};
