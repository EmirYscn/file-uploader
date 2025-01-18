import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { logout } from "../services/apiUser";
import CurrentRouteDisplay from "./CurrentRouteDisplay";
import Profile from "./Profile";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }
  return (
    <StyledHeader>
      <CurrentRouteDisplay />
      <ButtonContainer>
        <Button onClick={() => navigate("/signup")} styletype="header-button">
          Sign up
        </Button>
        {user ? (
          <>
            <Profile />
            <Button onClick={handleLogout} styletype="header-button">
              Log out
            </Button>
          </>
        ) : (
          <Button onClick={() => navigate("/login")} styletype="header-button">
            Log in
          </Button>
        )}
      </ButtonContainer>
    </StyledHeader>
  );
}

export default Header;
