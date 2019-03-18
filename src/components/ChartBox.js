import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

export default styled.div`
  width: 400px;
  height: 200px;
  ${breakpoint('mobile','tablet')`
    width: 330px;
    height: 165px;
  `}    
`