import styled, { css } from "styled-components";
import Logo from "./Logo";

const StyledWall = styled.div<{ isdark?: boolean }>`
  width: 50rem;
  background-color: var(--color-brand-700);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-brand-900);
    `}
`;

function Wall({ isDark }: { isDark?: boolean }) {
  return (
    <StyledWall isdark={isDark}>
      <Logo type={"wall"} />
    </StyledWall>
  );
}

export default Wall;
