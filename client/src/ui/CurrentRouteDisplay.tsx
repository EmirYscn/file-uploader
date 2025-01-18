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
  // path.pop();
  const mainRoute = path.shift();
  console.log(path);
  // let pathString: string = "";
  // path.forEach((el) => {
  //   // el = el[0]
  //   pathString += " / ";
  //   pathString += el;
  // });
  // console.log(pathString);
  return (
    <StyledCurrentRouteDisplay>
      {<Link to={`/${mainRoute}`}>{mainRoute} </Link>}
      {path.map((path, index) => (
        <Link to={`/${mainRoute}/${path}`} key={index}>
          <span>
            <Img src="/right-arrow.svg" alt="" /> {path}
          </span>
        </Link>
      ))}
    </StyledCurrentRouteDisplay>
  );
}

export default CurrentRouteDisplay;
