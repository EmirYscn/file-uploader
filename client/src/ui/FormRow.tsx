import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.2rem 0;
  /* color: black; */

  /* &:not(:last-child) {
    border-top: 1px solid var(--color-grey-100);
  } */

  &:first-child {
    padding-top: 0;
    border-top: none;
  }
  &:nth-child(2) {
    border-top: none;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr; /* Stack label and input on smaller screens */
    gap: 1rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const ApiError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 2 / -1;
  text-align: end;
`;

const FormError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  grid-column: 2 / -1;
  text-align: end;
`;

type FormRowProps = {
  label?: string;
  apiError?: string;
  formError?: string;
  children: React.ReactNode;
};

function FormRow({ label, apiError, formError, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {apiError && <FormError>*{apiError}</FormError>}
      {label && children && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {formError && <ApiError>*{formError}</ApiError>}
    </StyledFormRow>
  );
}

export default FormRow;
