import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

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
  const { user } = useContext(UserContext);
  return (
    <StyledHeader>
      <Button onClick={() => navigate("/signup")} styletype="header-button">
        Sign up
      </Button>
      {user ? (
        <Button onClick={() => navigate("/logout")} styletype="header-button">
          Log out
        </Button>
      ) : (
        <Button onClick={() => navigate("/login")} styletype="header-button">
          Log in
        </Button>
      )}
    </StyledHeader>
  );
}

export default Header;
