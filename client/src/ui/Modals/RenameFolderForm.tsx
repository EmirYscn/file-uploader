import styled from "styled-components";
import Button from "../Button";
import Heading from "../Heading";
import { useForm } from "react-hook-form";

import Input from "../Input";
import { Folder } from "../../types/models";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

type FormData = Folder;

type RenameFolderProps = {
  resourceName: string;
  onConfirm?: (data: Folder) => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function RenameFolderForm({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: RenameFolderProps) {
  const { handleSubmit, register } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    await onConfirm?.(data);
    onCloseModal?.();
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Rename {resourceName}</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          type="text"
          {...register("name")}
          width={"100%"}
          defaultValue={resourceName}
        />
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
    </StyledConfirmDelete>
  );
}

export default RenameFolderForm;
