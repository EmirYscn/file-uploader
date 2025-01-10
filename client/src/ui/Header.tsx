import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 1.2rem;
  justify-content: end;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <Button onClick={() => navigate("/signup")} type="header-button">
        Sign up
      </Button>
      <Button onClick={() => navigate("/login")} type="header-button">
        Log in
      </Button>
    </StyledHeader>
  );
}

export default Header;
