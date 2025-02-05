import { useNavigate } from "react-router";
import styled from "styled-components";

import Button from "./Button";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
`;

function MainHeader() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <Logo />
      <Buttons>
        <Button onClick={() => navigate("/signup")} styletype="header-button">
          Sign up
        </Button>
        <Button onClick={() => navigate("/login")} styletype="header-button">
          Log in
        </Button>
      </Buttons>
    </StyledHeader>
  );
}

export default MainHeader;
