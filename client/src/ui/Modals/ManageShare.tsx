import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

import { UserWithShareInfo } from "../../types/models";
import { accessType } from "../../types/enums";

import Heading from "../Heading";
import Button from "../Button";
import Spinner from "../Spinner";

import { ThemeContext } from "../../contexts/themeContext";
import { isExpired } from "../../utils/dateCompare";
import { add } from "date-fns";
import {
  deleteFolderShare,
  getSharedUsers,
  updateShareFolder,
} from "../../services/apiFolders";

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
`;

const UserCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
`;

const UserCard = styled.div<{ isdark?: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  align-items: center;
  row-gap: 1rem;
  column-gap: 2rem;
  padding: 1rem 2rem;
  background-color: var(--color-grey-100);
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
  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-400);
      color: var(--color-grey-200);
    `}
`;

const NoUsers = styled.h2`
  text-align: center;
  opacity: 0.2;
`;

const Select = styled.select<{ isdark?: boolean }>`
  appearance: none;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  color: #333;
  width: 100%;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
  }

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 12px;

  & option {
    background-color: #fff;
    color: #333;
    font-size: 16px;
    padding: 8px;
  }

  & option:disabled {
    color: #999;
  }

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
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
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

function ManageShare({ onConfirm, disabled, folderId }: ManageShareProps) {
  const { isDark } = useContext(ThemeContext);
  const { register, handleSubmit, setValue } =
    useForm<Record<string, string>>();

  const [users, setUsers] = useState<UserWithShareInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditedIds, setIsEditedIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchSharedUsers() {
      try {
        setIsLoading(true);
        const users = await getSharedUsers(folderId);
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
    setIsEditedIds((prev) => prev?.filter((id) => id !== userId));
  }

  async function handleRefreshExpireDate(userId: number) {
    const expireDate = add(new Date(), { days: 3 });
    const newData = {
      userId,
      folderId,
      expireDate,
    };
    console.log("Updated Expire Date:", newData);
    await updateShareFolder(newData);
    try {
      setIsLoading(true);
      await updateShareFolder(newData);
      setUsers((users) =>
        users.map((user) =>
          user.user.id === userId ? { ...user, expireDate } : user
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteUser(userId: number) {
    try {
      setIsLoading(true);
      await deleteFolderShare(userId, folderId);
      setUsers((users) => users.filter((user) => user.user.id !== userId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledManageShare isdark={isDark}>
      <Heading as="h3">Manage Shared Users</Heading>
      <Form onSubmit={handleSubmit(() => {})}>
        {users.length === 0 ? (
          <NoUsers>There is no user</NoUsers>
        ) : (
          <Users>
            {isLoading ? (
              <Spinner />
            ) : (
              users.map((user) => (
                <UserCardWrapper key={user.user.id}>
                  <UserCard isdark={isDark}>
                    <span>{user.user.email}</span>
                    <Select
                      {...register(`${user.user.id}-accessType`)}
                      isdark={isDark}
                      defaultValue={user.accessType!}
                      onChange={() =>
                        setIsEditedIds((prev) =>
                          prev
                            ? [...new Set([...prev, user.user.id])]
                            : [user.user.id]
                        )
                      }
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
                    styletype="modal-button-cancel"
                    onClick={() => {
                      setValue(`${user.user.id}-accessType`, user.accessType!);
                      setIsEditedIds((prev) =>
                        prev?.filter((id) => id !== user.user.id)
                      );
                    }}
                    disabled={!isEditedIds?.includes(user.user.id)}
                  >
                    Cancel
                  </Button>

                  <Button
                    styletype="modal-button-confirm"
                    type="submit"
                    onClick={handleSubmit((data) =>
                      onSubmit(data, user.user.id)
                    )}
                    disabled={disabled || !isEditedIds?.includes(user.user.id)}
                  >
                    Done
                  </Button>
                </UserCardWrapper>
              ))
            )}
          </Users>
        )}
      </Form>
    </StyledManageShare>
  );
}

export default ManageShare;
