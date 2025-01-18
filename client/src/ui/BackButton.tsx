import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import styled, { css } from "styled-components";

const StyledBackButton = styled.button<{ poscontext: string }>`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;
  position: absolute;

  left: -9rem;
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
`;

type BackButtonProps = {
  posContext: "signup" | "other";
};

function BackButton({ posContext = "other" }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  pathSegments.shift();
  const isSubRoot = pathSegments.length > 1;
  return (
    isSubRoot && (
      <>
        <StyledBackButton onClick={() => navigate(-1)} poscontext={posContext}>
          <FaArrowAltCircleLeft />
        </StyledBackButton>
      </>
    )
  );
}

export default BackButton;
