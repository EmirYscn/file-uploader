import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 6.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo.svg" alt="logo" />
    </StyledLogo>
  );
}

export default Logo;
