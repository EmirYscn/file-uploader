import { useContext } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/themeContext";

const StyledHeading = styled.h1.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ type?: string; isdark?: boolean }>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.type === "bg" &&
    css`
      font-size: 5em;
      opacity: 0.1;
      position: absolute;
      left: -11rem;
      top: -7.7rem;
      color: var(--color-grey-400);
      pointer-events: none;
    `}

    ${(props) =>
    props.isdark &&
    css`
      color: var(--color-grey-200);
    `}

  line-height: 1.4;
`;

type HeadingProps = {
  children: string | string[];
  as?: "h1" | "h2" | "h3"; // Restrict `as` to specific heading levels
  type?: string;
};

function Heading({ children, as, type }: HeadingProps) {
  const { isDark } = useContext(ThemeContext);
  return (
    <StyledHeading as={as} isdark={isDark} type={type}>
      {children}
    </StyledHeading>
  );
}

export default Heading;
