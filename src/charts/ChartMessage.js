import React from 'react'
import PropTypes from 'prop-types'
import ChartBox from '../components/ChartBox'
import ChartRectangle from '../components/ChartRectangle'

const ChartMessage = ({message}) =>
  <ChartBox><svg><ChartRectangle /><text x='200' y='15'>{message}</text></svg></ChartBox>

ChartMessage.propTypes = {
  message: PropTypes.string
}

export default ChartMessage