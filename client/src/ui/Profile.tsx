import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import styled from "styled-components";
import Modal from "./Modal";
import Menus from "./Menus";
import { IoPerson, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const StyledProfile = styled.div`
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  font-size: small;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-brand-600);
  box-shadow: var(--shadow-md);
`;

function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id={user!.id}>
          <StyledProfile>{user?.username}</StyledProfile>
        </Menus.Toggle>
        <Menus.List id={user!.id}>
          <Menus.Button
            icon={<IoPerson />}
            onClick={() => navigate("/profile")}
          >
            Profile
          </Menus.Button>
          <Menus.Button
            icon={<IoSettingsOutline />}
            onClick={() => navigate("/settings")}
          >
            Settings
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}

export default Profile;
