import { User } from "../types/models";

export const createUser = async (data: User) => {
  console.log(data);
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // return await response.json();
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error; // Rethrow the error after logging it
  }
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
