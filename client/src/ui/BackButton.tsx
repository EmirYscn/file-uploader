import { FaArrowCircleLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import styled, { css } from "styled-components";

const StyledBackButton = styled.button<{ poscontext: string }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;
  position: absolute;
  background: none;

  left: -4rem;
  top: -3rem;
  z-index: 1000;

  ${(props) =>
    props.poscontext === "signup" &&
    css`
      left: 3rem;
      top: 3rem;
    `}

  &:hover {
    background-color: #fffb09a0;
  }

  & svg {
    height: 2rem;
    width: auto;
  }
`;

type BackButtonProps = {
  posContext?: "signup" | "other";
};

function BackButton({ posContext = "other" }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  pathSegments.shift();
  const isSubRoot = pathSegments.length > 1;
  const isSignup = pathSegments[0] === "signup";
  return (
    (isSubRoot || isSignup) && (
      <>
        <StyledBackButton onClick={() => navigate(-1)} poscontext={posContext}>
          <FaArrowCircleLeft />
        </StyledBackButton>
      </>
    )
  );
}

export default BackButton;
