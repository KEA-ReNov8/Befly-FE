import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 82px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.2s, color 0.2s, border 0.2s;
`;

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          background: #63cbb6;
          color: #fff;
          border: none;
        `
      : css`
          background: #fff;
          color: #444;
          border: 1.5px solid #d3d3d3;
        `}
`;

const WriteButton = ({ children, variant = 'primary', onClick, ...rest }) => (
  <StyledButton
    style={getButtonStyle(variant)}
    onClick={onClick}
    {...rest}
  >
    {children}
  </StyledButton>
);

export default WriteButton;
