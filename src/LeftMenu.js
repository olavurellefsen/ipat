import React from 'react'
import PropTypes from 'prop-types'
import ScenarioSelectionList from './scenarioSelection/ScenarioSelectionList'
import MenuLayout from './components/MenuLayout'
import MenuHeader from './components/MenuHeader'
import MenuHeaderLeft from './components/MenuHeaderLeft'
import MenuHeaderRight from './components/MenuHeaderRight'
import AppLogo from './components/AppLogo'
import MenuTitle from './components/MenuTitle'
import MenuSeparatorLine from './components/MenuSeparatorLine'
import MenuRoutes from './components/MenuRoutes'
import MenuItem from './components/MenuItem'
import ScenarioSelection from './components/ScenarioSelection'
import MenuFooter from './components/MenuFooter'
import CopyrightNotice from './components/CopyrightNotice'
import ExternalLink from './components/ExternalLink'

class ScenarioSelectionMenu extends React.Component {

  render() {
    return (
      <MenuLayout showMobileMenu={this.props.showMobileMenu}>
        <MenuHeader>
          <MenuHeaderLeft>
            <MenuTitle to='/'>
              IPAT(D)
            </MenuTitle>
            <MenuRoutes>
              <MenuItem to='/about'>About the tool</MenuItem>
            </MenuRoutes>
          </MenuHeaderLeft>
          <MenuHeaderRight>
            <AppLogo src='./images/dtulogo_white.png' alt='logo'/>
          </MenuHeaderRight>
        </MenuHeader>
        <MenuSeparatorLine />        
        <ScenarioSelection>
          <ScenarioSelectionList
            updateScenarioSelection={this.props.updateScenarioSelection}
            name='populationSelection'
            selectedValue={this.props.scenarioSelection.populationSelection}
            dimensionOptions={this.props.scenarioCombinations.populationOptions}
            dimensionTitle='Population'
          />
          <ScenarioSelectionList
            updateScenarioSelection={this.props.updateScenarioSelection}
            name='affluenceSelection'
            selectedValue={this.props.scenarioSelection.affluenceSelection}
            dimensionOptions={this.props.scenarioCombinations.affluenceOptions}
            dimensionTitle='Affluence'
          />
          <ScenarioSelectionList
            updateScenarioSelection={this.props.updateScenarioSelection}
            name='technologySelection'
            selectedValue={this.props.scenarioSelection.technologySelection}
            dimensionOptions={this.props.scenarioCombinations.technologyOptions}
            dimensionTitle='Technology'
          />
          <ScenarioSelectionList
            updateScenarioSelection={this.props.updateScenarioSelection}
            name='dietSelection'
            selectedValue={this.props.scenarioSelection.dietSelection}
            dimensionOptions={this.props.scenarioCombinations.dietOptions}
            dimensionTitle='Diet'
          />
        </ScenarioSelection>
        <MenuSeparatorLine />        
        <MenuFooter>
          <CopyrightNotice>
            <ExternalLink href='http://www.tokni.com'>Online version by Tokni</ExternalLink>
          </CopyrightNotice>
        </MenuFooter>
      </MenuLayout>
    );
  }
}

ScenarioSelectionMenu.propTypes = {
  updateScenarioSelection: PropTypes.func.isRequired,
  scenarioSelection: PropTypes.object.isRequired,
  scenarioCombinations: PropTypes.object.isRequired,
  showMobileMenu: PropTypes.bool.isRequired
}

export default ScenarioSelectionMenu;