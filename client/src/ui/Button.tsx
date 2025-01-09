import styled, { css } from "styled-components";

const types = {
  "header-button": css`
    background-color: var(--color-brand-900);
    color: white;
  `,
  another: css`
    background-color: gray;
    color: black;
  `,
};

const StyledButton = styled.button<{ buttonType: "header-button" | "another" }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;

  ${(props) => types[props.buttonType]}
`;

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "header-button" | "another";
  children: string;
};

function Button({ onClick, type, children }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} buttonType={type}>
      {children}
    </StyledButton>
  );
}

export default Button;
