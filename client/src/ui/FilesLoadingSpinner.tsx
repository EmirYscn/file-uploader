import styled, { keyframes } from "styled-components";

// Define the spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the spinner
const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--color-primary, #3498db); /* Use theme color */
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  display: inline-block;
  margin-left: 8px; /* Space between text and spinner */
`;

const FilesLoadingSpinner = () => {
  return <Spinner />;
};

export default FilesLoadingSpinner;
