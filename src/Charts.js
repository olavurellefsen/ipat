import React from 'react'
import PropTypes from 'prop-types'
import MultiLineChart from './charts/MultiLineChart'
import OneLineChart from './charts/OneLineChart'
import EnergyShareChart from './charts/EnergyShareChart'
import LegendWidget from './world/LegendWidget'
import WorldMapContainer from './world/WorldMapContainer'
import MainArea from './components/MainArea'
import Flex from './components/Flex'
import Welcome from './alert/Welcome'

const Charts = (props) => (
  <MainArea>
    {(props.scenarioSelection.showWelcome===true) && <Welcome closeWelcome={props.closeWelcome} />}
    <Flex>
      <MultiLineChart type="3" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />
      {(props.scenarioSelection.clickedRegions.length !== 0) && <MultiLineChart type="2" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />}
      {(props.scenarioSelection.clickedRegions.length === 0) && <OneLineChart type="1" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView}/>}
      <OneLineChart type="0" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView}/>
      <MultiLineChart type="8" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />
      {(props.scenarioSelection.clickedRegions.length !== 0) && <MultiLineChart type="4" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />}
      {(props.scenarioSelection.clickedRegions.length === 0) && <OneLineChart type="4" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView}/>}
      {(props.scenarioSelection.clickedRegions.length !== 0) && <MultiLineChart type="6" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />}
      {(props.scenarioSelection.clickedRegions.length === 0) && <OneLineChart type="6" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView}/>}
      <MultiLineChart type="5" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} /> 
      <EnergyShareChart type="10" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />
      <EnergyShareChart type="11" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} />
      <MultiLineChart type="12" scenarioSelection={props.scenarioSelection} UpdateWorldView={props.UpdateWorldView} /> 
      <WorldMapContainer 
        scenarioSelection={props.scenarioSelection} 
        UpdateCurrentRegion={props.UpdateCurrentRegion} 
        UpdateClickedRegions={props.UpdateClickedRegions}
      />
      <LegendWidget scenarioSelection={props.scenarioSelection} onRegionItemChange={props.onRegionItemChange} UpdateCurrentRegion={props.UpdateCurrentRegion}/>      
    </Flex>
  </MainArea>
)

Charts.propTypes = {
  scenarioSelection: PropTypes.object.isRequired,
  UpdateCurrentRegion: PropTypes.func.isRequired,
  UpdateClickedRegions: PropTypes.func.isRequired,
  UpdateWorldView: PropTypes.func.isRequired,
  closeWelcome: PropTypes.func.isRequired,
  onRegionItemChange: PropTypes.func.isRequired
}


export default Charts