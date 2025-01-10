import styled, { css } from "styled-components";

const types = {
  "header-button": css`
    background-color: var(--color-brand-700);
    color: white;
  `,
  "form-button-submit": css`
    background-color: #0c68ca;
    color: white;
  `,
  "form-button-cancel": css`
    background-color: #df5b5b;
    color: white;
  `,
};

type ButtonTypes =
  | "header-button"
  | "form-button-cancel"
  | "form-button-submit";

const StyledButton = styled.button<{ buttontype: ButtonTypes }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;

  ${(props) => types[props.buttontype]}
`;

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "header-button" | "form-button-submit" | "form-button-cancel";
  children: string;
};

function Button({ onClick, type, children }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} buttontype={type}>
      {children}
    </StyledButton>
  );
}

export default Button;
