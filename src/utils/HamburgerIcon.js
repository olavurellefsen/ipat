import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const HamburgerIconWrapper = styled.div`
  display: none;
  ${breakpoint('mobile','tablet')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
    padding-bottom: 15px;
  `}
`

const HamburgerIconItem = styled.div`
  width: 35px;
  height: 4px;
  background-color: white;
  margin: 3px 0;
`

const HamburgerIcon = () => (
  <HamburgerIconWrapper>
    <HamburgerIconItem/><HamburgerIconItem/><HamburgerIconItem/>
  </HamburgerIconWrapper>
)

export default HamburgerIcon