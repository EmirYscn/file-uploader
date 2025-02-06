import { useContext } from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";

import CurrentRouteDisplay from "./CurrentRouteDisplay";
import Button from "./Button";
import Profile from "./Profile";
import DarkModeToggle from "./DarkModeToggle";

import { UserContext } from "../contexts/userContext";

import { logout } from "../services/apiUser";

const StyledHeader = styled.header.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark?: boolean }>`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-100);
      border-bottom: 1px solid var(--color-black-200);
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 1.2rem;
`;

function ProfileHeader({ isDark }: { isDark?: boolean }) {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/login");
  }
  return (
    <StyledHeader isdark={isDark}>
      <ButtonContainer>
        <DarkModeToggle />
        <Button onClick={() => navigate("/signup")} styletype="header-button">
          Sign up
        </Button>
        {user ? (
          <>
            <Profile isDark={isDark} />
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

export default ProfileHeader;
