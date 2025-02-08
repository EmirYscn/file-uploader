import styled, { css } from "styled-components";

const Form = styled.form<{ isdark?: boolean }>`
  padding: 2.4rem 4rem;
  display: grid;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  /* Dark mode */
  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-500);
      color: var(--color-grey-200);
    `}

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 2rem;
    font-size: 1.2rem;
    max-width: 90%; /* Makes it more adaptable on tablets */
  }

  @media (max-width: 480px) {
    padding: 1.6rem;
    font-size: 1.1rem;
    max-width: 100%; /* Takes full width on small screens */
  }
`;

export default Form;
