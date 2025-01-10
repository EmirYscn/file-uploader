import styled from "styled-components";

const Form = styled.form`
  padding: 2.4rem 4rem;

  /* Box */
  background-color: var(--color-brand-600);
  border: 1px solid var(--color-brand-700);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
  box-shadow: var(--shadow-lg);

  &.title {
    color: white;
  }
`;

export default Form;
