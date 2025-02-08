import { useContext } from "react";
import { useNavigate } from "react-router";
import { IoPerson, IoSettingsOutline } from "react-icons/io5";
import styled, { css } from "styled-components";

import Menus from "./Menus";

import { UserContext } from "../contexts/userContext";
import ProfileImage from "./ProfileImage";

const StyledProfileInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark?: boolean }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  font-size: small;
  background: none;
  color: var(--color-brand-600);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 1rem;

  ${(props) =>
    props.isdark &&
    css`
      color: var(--color-grey-200);
    `}
`;

// const StyledProfile = styled.div`
//   display: flex;
//   align-items: center;
// `;

function Profile({ isDark }: { isDark?: boolean }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={user!.id}>
            <StyledProfileInfo isdark={isDark}>
              <ProfileImage imgSize="sm" context="header" /> {user?.username}
            </StyledProfileInfo>
          </Menus.Toggle>
          <Menus.List id={user!.id}>
            <Menus.Button
              icon={<IoPerson />}
              onClick={() => navigate("/profile")}
              isFolderOwner={true}
            >
              Profile
            </Menus.Button>
            <Menus.Button
              icon={<IoSettingsOutline />}
              onClick={() => navigate("/settings")}
              isFolderOwner={true}
            >
              Settings
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </>
  );
}

export default Profile;
