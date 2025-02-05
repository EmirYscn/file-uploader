import styled, { css } from "styled-components";

const Form = styled.form<{ isdark?: boolean }>`
  padding: 2.4rem 4rem;

  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
  box-shadow: var(--shadow-lg);
  width: 60%;

  /* Dark mode */
  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-500);
      color: var(--color-grey-200);
    `}
`;

export default Form;
