import styled from "styled-components";
import Logo from "./Logo";

const StyledWall = styled.div`
  width: 50rem;
  background-color: var(--color-brand-700);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Wall() {
  return (
    <StyledWall>
      <Logo type={"wall"} />
    </StyledWall>
  );
}

export default Wall;
