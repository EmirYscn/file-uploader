import styled, { css } from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import Heading from "../Heading";
import Button from "../Button";

const StyledConfirmDelete = styled.div<{ isdark?: boolean }>`
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
`;

type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm?: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  const { isDark } = useContext(ThemeContext);
  return (
    <StyledConfirmDelete isdark={isDark}>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

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
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
