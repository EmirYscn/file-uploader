import React, { forwardRef, useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/themeContext";

const StyledInput = styled.input<{ isdark?: boolean; width?: string }>`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  color: black;

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${(props) =>
    props.isdark &&
    css`
      border: 1px solid var(--color-black-300);
      background-color: var(--color-black-400);
      color: var(--color-grey-200);
    `}
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
};

// Input component with ref forwarding
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width, ...rest }, ref) => {
    const { isDark } = useContext(ThemeContext);
    return <StyledInput ref={ref} isdark={isDark} width={width} {...rest} />;
  }
);

export default Input;
