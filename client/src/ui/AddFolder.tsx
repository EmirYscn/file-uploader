import styled, { css } from "styled-components";
import Heading from "./Heading";
import { useForm } from "react-hook-form";
import { Folder } from "../types/models";
import Input from "./Input";
import Button from "./Button";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

const StyledAddFolder = styled.div<{ isdark?: boolean }>`
  width: 40rem;
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

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-300);
    `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

type FormData = Folder;

type AddFolderProps = {
  onConfirm?: (data: Folder) => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function AddFolder({ onConfirm, disabled, onCloseModal }: AddFolderProps) {
  const { isDark } = useContext(ThemeContext);
  const { handleSubmit, register } = useForm<FormData>();
  async function onSubmit(data: FormData) {
    console.log(data);
    await onConfirm?.(data);
    onCloseModal?.();
  }

  return (
    <StyledAddFolder isdark={isDark}>
      <Heading as="h3">Add Folder</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input id="name" type="text" {...register("name")} width={"100%"} />
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
    </StyledAddFolder>
  );
}

export default AddFolder;
