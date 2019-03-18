import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link)`
  font-weight: bold;
  font-size: 1em;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`