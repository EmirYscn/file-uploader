import { useContext } from "react";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";

import Button from "./Button";
import Profile from "./Profile";
import DarkModeToggle from "./DarkModeToggle";

import { AuthContext } from "../contexts/authContext";

import { logout } from "../services/apiAuth";

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

  const {
    auth: { user },
    setAuth,
  } = useContext(AuthContext);

  async function handleLogout() {
    await logout();

    setAuth({ isAuthenticated: false, user: null });
    navigate("/login");
  }
  return (
    <StyledHeader isdark={isDark}>
      <ButtonContainer>
        <DarkModeToggle />
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
