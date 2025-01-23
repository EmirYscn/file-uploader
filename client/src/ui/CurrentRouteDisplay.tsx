import { Link, useLocation } from "react-router";
import styled from "styled-components";

const StyledCurrentRouteDisplay = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  color: #ceb40e;

  & span {
    display: flex;
    align-items: center;
  }
`;

const Img = styled.img`
  height: 2rem;
`;

function CurrentRouteDisplay() {
  const location = useLocation();
  const path = location.pathname.split("/");
  path.shift();
  const mainRoute = path.shift();
  const isInSubRoute = path.length > 0;
  return (
    <>
      {isInSubRoute && (
        <StyledCurrentRouteDisplay>
          <Link to={`/${mainRoute}`}>{mainRoute}</Link>
          {path.map((pathSegment, index) => (
            <Link to={`/${mainRoute}/${pathSegment}`} key={index}>
              <span>
                <Img src="/right-arrow.svg" alt="Right arrow" /> {pathSegment}
              </span>
            </Link>
          ))}
        </StyledCurrentRouteDisplay>
      )}
    </>
  );
}

export default CurrentRouteDisplay;
