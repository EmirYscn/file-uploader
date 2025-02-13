import { useContext } from "react";
import { IoSunny } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import styled, { css } from "styled-components";

import { ThemeContext } from "../contexts/themeContext";

const StyledDarkModeToggle = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark?: boolean }>`
  background: none;
  outline: none;
  padding: 0.5rem;
  border: none;

  &:active {
    border: none;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  & svg {
    height: 2rem;
    width: auto;
    ${(props) =>
      props.isdark &&
      css`
        color: white;
      `}
  }
`;

function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useContext(ThemeContext);

  const handleToggle = () => {
    toggleDarkMode((prev) => !prev);
  };

  return (
    <StyledDarkModeToggle onClick={handleToggle} isdark={isDark}>
      {isDark ? <MdDarkMode /> : <IoSunny />}
    </StyledDarkModeToggle>
  );
}

export default DarkModeToggle;
