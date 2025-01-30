import styled, { css } from "styled-components";
import Heading from "./Heading";
import { useForm } from "react-hook-form";
import { Folder, User } from "../types/models";
import Input from "./Input";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { add } from "date-fns";
import { accessType } from "../types/enums";
import { ThemeContext } from "../contexts/themeContext";

const StyledSharedFolder = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div:last-child {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Form = styled.form<{ isdark?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  ${(props) =>
    props.isdark &&
    css`
      color: var(--color-grey-200);
    `}
`;

const SelectedUsers = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & div {
    display: flex;
    gap: 1rem;
    box-shadow: var(--shadow-md);
    align-items: center;
    padding: 0.2rem;
    border-radius: 8px;

    & span {
      font-size: small;
    }

    & button {
      border: none;
      background: none;

      & svg {
        height: 1.3rem;
        width: auto;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.3);
          color: var(--color-red-700);
        }
      }
    }
  }
`;

const Select = styled.select<{ isdark?: boolean }>`
  /* General Select Styling */
  appearance: none; /* Removes default arrow for cross-browser compatibility */
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  font-family: inherit;
  color: #333;
  width: 100%; /* Adjust based on your layout */
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff; /* Highlighted border color */
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.4); /* Subtle focus effect */
  }

  /* Optional: Add a custom dropdown arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 12px;

  /* Option Styling */
  & option {
    background-color: #fff;
    color: #333;
    font-size: 16px;
    padding: 8px;
  }

  /* Styling for Disabled Options */
  & option:disabled {
    color: #999;
  }

  /* Hover effect for options (if supported by browser) */
  & option:hover {
    background-color: #f0f8ff;
  }

  ${(props) =>
    props.isdark &&
    css`
      background-color: #333;
      color: #f9f9f9;
      border: 1px solid #ccc;
      &:focus {
        border-color: #007bff; /* Highlighted border color */
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.4); /* Subtle focus effect */
      }
      & option {
        background-color: #333;
        color: #f9f9f9;
      }
      & option:hover {
        background-color: #f9f9f9;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

type SelectedUser = {
  email: string;
  id: number;
};

export type FormData = {
  users: number[];
  expireDate: string;
  accessType: accessType;
};

export type Data = {
  users: number[];
  expireDate: Date | null;
  accessType: accessType;
};

type ShareFolderProps = {
  onConfirm?: (data: Data) => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
};

const expirationMap: Record<string, number | null> = {
  "1d": 1,
  "3d": 3,
  indefinite: null, // null for no expiration
};

function ShareFolder({ onConfirm, disabled, onCloseModal }: ShareFolderProps) {
  const { isDark } = useContext(ThemeContext);
  const { handleSubmit, register } = useForm<FormData>();
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    async function searchUser() {
      if (!debouncedValue) {
        setUsers([]);
        return;
      }

      try {
        const res = await fetch(`/api/search/user?email=${debouncedValue}`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const users = await res.json();
        setUsers(users);
      } catch (error) {
        console.log("Error fetching users", error);
      }
    }

    searchUser();
  }, [debouncedValue]);

  function handleSelectedUsersChange(selectedUser: SelectedUser) {
    if (!selectedUsers.some((user) => user.id === selectedUser.id)) {
      const updatedSelectedUsers = [...selectedUsers, selectedUser];
      setSelectedUsers(updatedSelectedUsers);
    }
  }

  function handleRemoveSelectedUser(userId: number) {
    setSelectedUsers((selectedUser) =>
      selectedUser.filter((user) => user.id !== userId)
    );
  }

  async function onSubmit(data: FormData) {
    const expirationPeriod = expirationMap[data.expireDate];
    const expireDate = expirationPeriod
      ? add(new Date(), { days: expirationPeriod })
      : null;
    const formDataWithUsers = {
      ...data,
      expireDate,
      users: selectedUsers.map((user) => user.id),
    };
    await onConfirm?.(formDataWithUsers);
    onCloseModal?.();
  }

  return (
    <StyledSharedFolder>
      <Heading as="h3">Share Folder</Heading>
      <Form onSubmit={handleSubmit(onSubmit)} isdark={isDark}>
        <Label htmlFor="user">Search User</Label>
        <Input
          id="user"
          type="text"
          width={"100%"}
          value={value}
          onChange={handleInputChange}
        />
        {selectedUsers.length > 0 && (
          <SelectedUsers>
            {selectedUsers.map((user) => (
              <div key={user.id}>
                <span>{user.email}</span>
                <button
                  onClick={() => handleRemoveSelectedUser(user.id)} // Add a function to remove the user
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </SelectedUsers>
        )}
        {users.length > 0 && (
          <Select
            isdark={isDark}
            name="users"
            id="users"
            onChange={(e) => {
              const selectedUserId = Number(e.target.value);
              const selectedUser = users.find(
                (user) => user.id === selectedUserId
              );
              if (selectedUser) handleSelectedUsersChange(selectedUser);
            }}
            defaultValue={""}
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </Select>
        )}
        <Label htmlFor="expireDate">Expire Date</Label>
        <Select isdark={isDark} id="expireDate" {...register("expireDate")}>
          <option value="1d">1 Day</option>
          <option value="3d">3 Day</option>
          <option value="indefinite">Indefinite</option>
        </Select>
        <Label htmlFor="accessType">Access Type</Label>
        <Select isdark={isDark} id="accessType" {...register("accessType")}>
          <option value="LIMITED">Limited Access</option>
          <option value="FULL">Full Access</option>
        </Select>
        <div>
          <Button
            styletype="modal-button-cancel"
            disabled={disabled}
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button
            styletype="modal-button-confirm"
            type="submit"
            disabled={disabled}
          >
            Done
          </Button>
        </div>
      </Form>
    </StyledSharedFolder>
  );
}

export default ShareFolder;
