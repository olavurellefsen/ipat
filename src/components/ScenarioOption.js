import styled from 'styled-components'

export default styled.div`
  display: flex;
  align-items: center;
  height: 26px;
  line-height: 26px;
  padding: 0 12px 0 15px;
  position: relative;
  width: 100%;
  border-radius: 0;
  background-color: ${props => (props.selected ? '#b50404' : 'inherit')};
  color: ${props => (props.selected ? 'white' : 'rgb(184,176,183)')};
  &:hover {
    cursor: pointer;
    background-color: ${props => (props.selected ? '#b50404' : '#555')};
    :after {
      content: '▶';
      position: absolute;
      left: 217px;
      color: ${props => (props.selected ? '#b50404' : '#555')};
      font-size: 1.5em;
    }
    > * {
      display: block;
      font-weight: ${props => (props.selected ? 'bold' : 'normal')};
    }
  }
`