import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 35rem;
  gap: 1rem;
  padding: 1.2rem 0;
  /* color: var(--color-brand-700); */
  color: black

  &:not(:last-child) {
    border-top: 1px solid var(--color-grey-100);
  }

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
      {label && children && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {formError && <ApiError>*{formError}</ApiError>}
      {apiError && <FormError>*{apiError}</FormError>}
    </StyledFormRow>
  );
}

export default FormRow;
