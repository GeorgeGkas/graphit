import styled from 'styled-components'

const AddButton = styled.button`
  background: 0;
  border: 0;
  cursor: pointer;
  float: right;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  &:hover {
    background: #ddd;
  }

  &:active {
    background: #ddd;
  }

  &,
  &:hover,
  &:active,
  &:focus {
    outline: 0;
  }
`

export default AddButton
