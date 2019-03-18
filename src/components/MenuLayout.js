import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

export default styled.div`
  display: flex;
  ${breakpoint('mobile','tablet')`
    display: ${props => props.showMobileMenu ? 'flex' : 'none'};
  `}

  min-height: 100vh;
  flex-direction: column;
  flex-shrink: 0;
  min-width: 220px;
  max-width: 220px;
  color: white;
  background: rgb(50, 50, 50);
  visibility: visible;
`