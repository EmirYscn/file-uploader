import styled, { css } from "styled-components";
import Heading from "../Heading";
import { useForm } from "react-hook-form";
import { Folder, User, UserWithShareInfo } from "../../types/models";
import Input from "../Input";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { MdDelete } from "react-icons/md";
import { data } from "react-router";
import Spinner from "../Spinner";
import { accessType } from "../../types/enums";
import { isExpired } from "../../utils/dateCompare";
import { RxUpdate } from "react-icons/rx";

const StyledManageShare = styled.div<{ isdark?: boolean }>`
  width: 80rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;

    ${(props) =>
      props.isdark &&
      css`
        color: var(--color-grey-200);
      `}
  }

  /* & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  } */

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-300);
      color: var(--color-grey-200);
    `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Users = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* grid-template-columns: 2fr 0.5fr 1fr; Ensure all UserCards have the same column width */
  /* column-gap: 3rem;
  row-gap: 1rem; */
`;
// const Users = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 0.5fr 1fr;
//   gap: 1rem;
//   align-items: center;
// `;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  font-weight: bold;
`;

const UserCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
`;

const UserCard = styled.div`
  /* display: contents; */
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  row-gap: 1rem;
  column-gap: 2rem;
  padding: 1rem 2rem;
  /* border: 1px solid var(--color-black-200); */
  background-color: var(--color-black-400);
  border-radius: 10px;

  & button {
    border: none;
    background: none;

    & svg {
      height: 2rem;
      width: auto;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.3);
        color: var(--color-red-700);
      }
    }
  }
`;

// const UserCard = styled.div`
//   grid-column: 1 / -1; /* Span all columns to allow styling */
//   display: flex;
//   gap: 1rem;
//   padding: 1rem;
//   border: 1px solid blue;
//   border-radius: 8px;
//   /* background-color: var(--color-grey-100); */
// `;

const Select = styled.select<{ isdark?: boolean }>`
  /* General Select Styling */
  appearance: none; /* Removes default arrow for cross-browser compatibility */
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
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

type ManageShareProps = {
  onConfirm?: (data: Partial<UserWithShareInfo>) => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
  folderId: number;
};

function ManageShare({
  onConfirm,
  disabled,
  onCloseModal,
  folderId,
}: ManageShareProps) {
  const { isDark } = useContext(ThemeContext);

  const [users, setUsers] = useState<UserWithShareInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue } =
    useForm<Record<string, string>>();

  useEffect(() => {
    async function fetchSharedUsers() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/folder/${folderId}/sharedUsers`);
        if (!response.ok) {
          throw new Error("Could not fetch shared users");
        }
        const users: UserWithShareInfo[] = await response.json();
        setUsers(users);

        // Initialize form values
        users.forEach((user) => {
          setValue(String(user.user.id), user.accessType || "FULL");
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSharedUsers();
  }, [folderId, setValue]);

  async function onSubmit(data: { [key: string]: string }, userId: number) {
    const newData = {
      userId,
      folderId,
      accessType: data[`${userId}-accessType`] as accessType,
    };
    console.log("Updated Access:", newData);
    await onConfirm?.(newData);
  }

  async function handleRefreshExpireDate(userId: number) {}

  async function handleDeleteUser(userId: number) {
    try {
      const response = await fetch(`/api/folders/folderShare`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, folderId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers((users) => users.filter((user) => user.user.id !== userId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledManageShare isdark={isDark}>
      <Heading as="h3">Manage Shared Users</Heading>
      <Form onSubmit={handleSubmit(() => {})}>
        <Users>
          {isLoading ? (
            <Spinner />
          ) : (
            users.map((user) => (
              <UserCardWrapper key={user.id}>
                <UserCard>
                  <span>Email</span>
                  <span>Access Type</span>
                  <span>Expiration Date</span>
                  {/* <span>Refresh Expire Date</span> */}
                  <span>Delete</span>
                  <span>{user.user.email}</span>
                  <Select
                    {...register(`${user.user.id}-accessType`)}
                    isdark={isDark}
                    defaultValue={user.accessType!}
                  >
                    <option value="FULL">FULL</option>
                    <option value="LIMITED">LIMITED</option>
                  </Select>
                  <span
                    style={{
                      color: isExpired(user.expireDate?.toString())
                        ? "red"
                        : "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {new Date(user.expireDate!).toDateString()}
                    <button
                      onClick={() => handleRefreshExpireDate(user.user.id)}
                    >
                      <RxUpdate />
                    </button>
                  </span>

                  <button onClick={() => handleDeleteUser(user.user.id)}>
                    <MdDelete />
                  </button>
                </UserCard>
                <Button
                  styletype="modal-button-confirm"
                  type="submit"
                  onClick={handleSubmit((data) => onSubmit(data, user.user.id))}
                  disabled={disabled}
                >
                  Done
                </Button>
              </UserCardWrapper>
            ))
          )}
        </Users>
      </Form>
    </StyledManageShare>
  );
}

export default ManageShare;
