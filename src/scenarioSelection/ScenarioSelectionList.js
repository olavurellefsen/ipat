import React from 'react'
import PropTypes from 'prop-types'
import ScenarioDivider from '../components/ScenarioDivider'
import ScenarioHeader from '../components/ScenarioHeader'
import ScenarioOption from '../components/ScenarioOption'
import ScenarioDescription from '../components/ScenarioDescription'

class ScenarioSelectionList extends React.Component {
  state = {
    value: this.props.selectedValue,
  }

  handleChange = (event, value) => {
    this.setState({ value })
    this.props.updateScenarioSelection(event, this.props.name, value)
  }

  render() {
    const { dimensionOptions, dimensionTitle } = this.props
    let stringValue=this.state.value.toString();
    let scenarioOptions = dimensionOptions.map(option =>
      {
        let optionValue=option.id.toString()
        return(
          <ScenarioOption
            key={option.id}
            value={optionValue}
            selected={optionValue===stringValue}
            onClick={(event) => this.handleChange(event, optionValue)}
          >
            # {option.short_description}
            <ScenarioDescription>
              {option.long_description}
            </ScenarioDescription>                 
          </ScenarioOption>

        )
      })
    return (
      <div style={{display:'flex', flexWrap: 'wrap'}}>
        <ScenarioDivider/>
        <ScenarioHeader>{dimensionTitle}</ScenarioHeader>
          {scenarioOptions}
      </div>
    )
  }
}

ScenarioSelectionList.propTypes = {
  updateScenarioSelection: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.any.isRequired,
  dimensionOptions: PropTypes.array.isRequired,
  dimensionTitle: PropTypes.string.isRequired,
}

export default ScenarioSelectionList;