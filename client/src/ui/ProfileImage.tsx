import { useContext } from "react";
import styled, { css } from "styled-components";

import { AuthContext } from "../contexts/authContext";

const ProfileContainer = styled.div<{ context?: "header" | "settings" }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  cursor: pointer;

  ${(props) =>
    props.context === "header" &&
    css`
      margin-top: 0;
      padding-top: 0;
    `}

  & p:hover {
    /* text-decoration: underline; */
    cursor: pointer;
    border-bottom: 1px solid var(--color-green-700);
    color: var(--color-green-700);
  }
`;

const imgSize = {
  sm: "3rem",
  md: "5rem",
  lg: "10rem",
};

const ImageWrapper = styled.div<{
  imgsize?: "sm" | "md" | "lg";
}>`
  position: relative;
  width: ${({ imgsize }) => (imgsize ? imgSize[imgsize] : "10rem")};
  height: ${({ imgsize }) => (imgsize ? imgSize[imgsize] : "10rem")};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
`;

const OverlayText = styled.div<{ context?: "header" | "settings" }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ImageWrapper}:hover & {
    opacity: 1; /* Show on hover */
  }

  ${(props) =>
    props.context === "header" &&
    css`
      /* Hide overlay for 'header' context */
      opacity: 0 !important;
    `}
`;

type ProfileImageProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  imgSize?: "sm" | "md" | "lg";
  context?: "header" | "settings";
};

function ProfileImage({
  children,
  onClick,
  imgSize,
  context = "settings",
}: ProfileImageProps) {
  const {
    auth: { user },
  } = useContext(AuthContext);

  return (
    <ProfileContainer onClick={onClick} context={context}>
      <ImageWrapper imgsize={imgSize}>
        <Image src={user?.avatarUrl || "/default-profile-icon.png"} />
        <OverlayText context={context}>Change</OverlayText>
      </ImageWrapper>
      {children}
    </ProfileContainer>
  );
}

export default ProfileImage;
