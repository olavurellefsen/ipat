import React from 'react'
import PropTypes from 'prop-types'
import AlertContainer from '../components/AlertContainer'
import AlertBody from '../components/AlertBody'
import CloseWindowIcon from '../components/CloseWindowIcon'
import Octicon from 'react-octicon'

const Welcome = (props) => (
  <AlertContainer>
    <AlertBody>
      With this tool, you can explore how global developments in
      population, affluence, technology and diet will impact the earth
      as we move towards year 2100. Select scenarios in the menu to
      the left and see how it impacts the charts below.
    </AlertBody>
    <CloseWindowIcon onClick={(event) => props.closeWelcome(event, 'showWelcome', false)}>
      <Octicon name='x' />
    </CloseWindowIcon>
  </AlertContainer>
)

Welcome.propTypes = {
  closeWelcome: PropTypes.func.isRequired
}

export default Welcome