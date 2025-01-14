import { Link } from "react-router";
import styled, { css } from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img<{ imgtype: string }>`
  height: 6.6rem;
  ${(props) =>
    props.imgtype === "wall" &&
    css`
      height: 15rem;
    `}

  width: auto;
`;

function Logo({ type }: { type: string }) {
  return (
    <StyledLogo>
      <Link to="/all">
        <Img src="/logo.svg" alt="logo" imgtype={type} />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
