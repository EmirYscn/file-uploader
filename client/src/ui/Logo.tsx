import { Link } from "react-router";
import styled, { css } from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img<{ imgType: string }>`
  height: 6.6rem;
  ${(props) =>
    props.imgType === "wall" &&
    css`
      height: 15rem;
    `}

  width: auto;
`;

function Logo({ type }: { type: string }) {
  return (
    <StyledLogo>
      <Link to="/home">
        <Img src="/logo.svg" alt="logo" imgType={type} />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
