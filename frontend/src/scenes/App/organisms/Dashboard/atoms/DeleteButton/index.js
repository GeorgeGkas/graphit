import styled from 'styled-components'

const CloseButton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
  float: right;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &,
  &:hover,
  &:active,
  &:focus {
    outline: 0;
  }
`

export default CloseButton
