import styled from '@emotion/styled';

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #ff5722;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #000;
  border: 2px solid #000;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 200px;
  box-shadow: 0px 0px 4px 2px rgba(255, 87, 34, 0.2);
  &:focus {
    outline: none;
    background-color: #ff8a65;
    border: 2px solid #ff8a65;
  }
  &:hover {
    background-color: #ff8a65;
    border: 2px solid #ff8a65;
  }
`;
