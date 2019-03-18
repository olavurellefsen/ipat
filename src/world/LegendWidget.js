import React from 'react'
import PropTypes from 'prop-types'
import regions from '../data/regions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle'
import ChartBox from '../components/ChartBox'
import styled from 'styled-components'

const RegionItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const RegionSelectBar = styled.div`
  font-size: 16px;
  margin: 25px 5px 5px 45px;
  display: flex;
`

const RegionSelectText = styled.div`
`

const RegionSelectLink = styled.div`
  color: blue;
  :hover {
    cursor: pointer;
  }
`

const RegionColumns = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 5px 0px 40px;
`

const RegionColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`

class LegendWidget extends React.Component {
  render() {
    let toggled;
    let thumbStyle;
    let labelStyle = { width: "calc(100% - 17px)", fontSize: 14, lineHeight: '16px', height: 12, display: 'inline-block' };
    let regionsList = regions.filter(region => region.id!=="0").map( region => {
      toggled = true;
      if(this.props.scenarioSelection.clickedRegions.indexOf(region.id) === -1) {
        toggled = false;
      }
      thumbStyle = {height: 10, width: 10, top: 2}
      if (this.props.scenarioSelection.currentRegion === region.id-1) {
        thumbStyle = {...thumbStyle, backgroundColor: region.color};
      }
      return(
        <RegionItem
          key={region.color}
          onMouseOver={(e) => {
            this.props.UpdateCurrentRegion(region.id-1);
            labelStyle = {color: region.color, width: "calc(100% - 17px)"}
          }}
          onMouseLeave={() => {
            this.props.UpdateCurrentRegion(-1)}
          }
        >
          <MuiThemeProvider>
            <Toggle 
              label={region.longName} 
              labelPosition = "right" 
              labelStyle = {labelStyle}
              toggled = {toggled}
              onToggle = {()=>{ this.props.onRegionItemChange(region.id) }}
              iconStyle = {{height: 7, width: 17}}
              thumbSwitchedStyle = {{backgroundColor: region.color}}
              thumbStyle = {thumbStyle}
              trackStyle = {{ height: 7, width: 17,  borderRadius: 5}} 
              trackSwitchedStyle = {{backgroundColor: region.color}}
            />
          </MuiThemeProvider>
        </RegionItem>
      )
    },this)
    
    let regionListLeft = [];
    let regionListRight = [];
    for (var i=0; i< regionsList.length; i++){
        if(i%2) regionListLeft.push(regionsList[i]);
        else regionListRight.push(regionsList[i]);
    }
    return (
      <ChartBox>
        <RegionSelectBar>
          <RegionSelectText>Select:&nbsp;</RegionSelectText> 
          <RegionSelectLink onClick={() => this.props.onRegionItemChange('selectall')}>All</RegionSelectLink>
          <RegionSelectText>,&nbsp;</RegionSelectText>
          <RegionSelectLink onClick={() => this.props.onRegionItemChange('selectnone')}>None</RegionSelectLink>
        </RegionSelectBar>
        <RegionColumns>
          <RegionColumn>
            {regionListLeft}
          </RegionColumn>
          <RegionColumn>
            {regionListRight}
          </RegionColumn>
        </RegionColumns>
      </ChartBox>
    )  
  }
}

LegendWidget.propTypes = {
    scenarioSelection: PropTypes.object.isRequired,
    onRegionItemChange: PropTypes.func.isRequired,
    UpdateCurrentRegion: PropTypes.func.isRequired
}

export default LegendWidget;