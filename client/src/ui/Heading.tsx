import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: blue"}
// `;

const Heading = styled.h1<{ type: string }>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.type === "bg" &&
    css`
      font-size: 5em;
      opacity: 0.1;
      position: absolute;
      left: -11rem;
      top: -7.7rem;
      color: var(--color-grey-400);
      pointer-events: none;
    `}

  line-height: 1.4
`;

export default Heading;
