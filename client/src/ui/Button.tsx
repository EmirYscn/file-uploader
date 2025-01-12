import styled, { css } from "styled-components";

const types = {
  "header-button": css`
    background-color: var(--color-brand-700);
    color: white;
  `,
  "form-button-submit": css`
    background-color: var(--color-grey-50);
    color: black;
    box-shadow: var(--shadow-lg);
  `,
  "form-button-cancel": css`
    background-color: #df5b5b;
    color: white;
    box-shadow: var(--shadow-lg);
  `,
  "modal-button-cancel": css`
    background-color: #df5b5b;
    color: white;
    box-shadow: var(--shadow-lg);
  `,
  "modal-button-confirm": css`
    background-color: var(--color-green-700);
    color: white;
    box-shadow: var(--shadow-lg);
  `,
};

type ButtonTypes =
  | "header-button"
  | "form-button-cancel"
  | "form-button-submit"
  | "modal-button-cancel"
  | "modal-button-confirm";

const StyledButton = styled.button<{ buttontype: ButtonTypes }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;

  ${(props) => types[props.buttontype]}

  &:hover {
    opacity: 0.9;
  }
`;

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styletype: ButtonTypes;
  children: string | React.ReactNode;
} & Omit<React.ComponentProps<"button">, "children">;

function Button({ onClick, styletype, children }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} buttontype={styletype}>
      {children}
    </StyledButton>
  );
}

export default Button;
