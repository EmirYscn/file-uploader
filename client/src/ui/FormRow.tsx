import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 25rem 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  color: white;

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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function FormRow({ label, error, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && children && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
