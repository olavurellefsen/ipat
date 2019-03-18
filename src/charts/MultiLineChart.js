import React from 'react'
import PropTypes from 'prop-types'
import {Chart, Line} from 'react-chartjs-2'
import ChartBox from '../components/ChartBox'
import WorldRegions from '../data/regions'
import MultiLineDefaultData from '../data/multiLineDefaultData'

class MultiLineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scenarioValuesAllRegions : MultiLineDefaultData[this.props.type].scenarioValuesAllRegions,
      factor : MultiLineDefaultData[this.props.type].factor
    }
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    scenarioSelection: PropTypes.object.isRequired,
    UpdateWorldView: PropTypes.func.isRequired
  }

  UpdateData = (nextProps) => {
    let factorId = parseInt(this.state.factor.id, 10);

    let populationId = nextProps.scenarioSelection.populationSelection
    let affluenceId = nextProps.scenarioSelection.affluenceSelection
    let technologyId = nextProps.scenarioSelection.technologySelection
    let dietId = nextProps.scenarioSelection.dietSelection
    let scenarioIdentifier = populationId+'-'+affluenceId+'-'+technologyId+'-'+dietId+'.json'

    fetch('data/'+scenarioIdentifier).then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then((data) => {
          this.setState({
            scenarioValuesAllRegions : data[factorId][factorId]['scenarioValuesAllRegions'],
            factor : data[factorId][factorId]['factor'] 
          })        
        });
      }
    ) 
  }

  componentDidMount () {
    this.UpdateData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let currentPopulationId = this.props.scenarioSelection.populationSelection
    let currentAffluenceId = this.props.scenarioSelection.affluenceSelection
    let currentTechnologyId = this.props.scenarioSelection.technologySelection
    let currentDietId = this.props.scenarioSelection.dietSelection
    let populationId = nextProps.scenarioSelection.populationSelection
    let affluenceId = nextProps.scenarioSelection.affluenceSelection
    let technologyId = nextProps.scenarioSelection.technologySelection
    let dietId = nextProps.scenarioSelection.dietSelection    
    if(currentPopulationId !== populationId ||
      currentAffluenceId !== affluenceId ||
      currentTechnologyId !== technologyId ||
      currentDietId !== dietId) {
      this.UpdateData(nextProps)
    }
  }

  render() {
    let factorId = parseInt(this.state.factor.id, 10);
    
    let labelString = this.state.factor.unit;
    let labelStringShort = this.state.factor.unitShort;
    let decimals = 0;
    let title = this.state.factor.title ;
    if(this.props.scenarioSelection.clickedRegions.length === 0 && factorId !== 4 && factorId !== 6) {
      title += ' (world)'
    }
  
    switch(factorId) {
      case 2:
      case 5:
      case 6:
      case 8:
        decimals = 2;
        break;
      default:
        decimals = 0;
    }
  
    let datasets = [];
    let regions = [];
    let years = [];
    
    for (let i = 0; i < this.state.scenarioValuesAllRegions.length; i++) {
      var scenarioValue = this.state.scenarioValuesAllRegions[i];
      if (regions.indexOf(scenarioValue.regionId) < 0){
        regions.push(scenarioValue.regionId);
      } 
      if(years.indexOf(scenarioValue.year)< 0) {
        years.push(scenarioValue.year);
      }
    }
  
    let cumulatedRegionValues = [];
    for (let i = 0; i< regions.length; i++) {
      var regionId = regions[i];
      let regionValues = [];
      for (let j = 0;j < this.state.scenarioValuesAllRegions.length; j++){
        if (this.state.scenarioValuesAllRegions[j].regionId === regionId) {
            regionValues.push(this.state.scenarioValuesAllRegions[j].scenarioValue.toFixed(decimals));
        }
      }
  
      let hideDataset = false;
      if (this.props.scenarioSelection.clickedRegions && this.props.scenarioSelection.clickedRegions.length !== 0){
        if (this.props.scenarioSelection.clickedRegions.indexOf(regionId) === -1) hideDataset = true;
      }
      let opacity = 'bb';
      let pointStyle = 'circle';
      let pointRadius = 3;
      let borderWidth = 2;
      
      if (this.props.scenarioSelection.currentRegion !== -1) {
        
        if (this.props.scenarioSelection.currentRegion !== regionId-1) {
          opacity = '88';
        } else {
          pointStyle = 'circle';
          pointRadius = 6;
          borderWidth = 4;
          opacity = 'ff';
        }
      }
      let label;
      let borderColor;
      
      if(this.props.scenarioSelection.clickedRegions.length === 0) { // no region selected
        for (let f=0; f<years.length; f++) cumulatedRegionValues[f]=0;
        for (let q=0; q< this.state.scenarioValuesAllRegions.length; q++) {
          cumulatedRegionValues[years.indexOf(this.state.scenarioValuesAllRegions[q].year)] += parseFloat(this.state.scenarioValuesAllRegions[q].scenarioValue);
        }
        for (let f=0; f<years.length; f++) cumulatedRegionValues[f]=cumulatedRegionValues[f].toFixed(decimals);
        regionValues = cumulatedRegionValues;
        label = 'World';
        borderColor = 'black';
      } else {
        label = WorldRegions[regionId].longName;
        borderColor = WorldRegions[regionId].colorCode + opacity;
      }
      datasets.push(
        {
          label: label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: borderColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: borderWidth,
          borderJoinStyle: 'miter',
          pointBorderColor: borderColor,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: borderColor,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: pointRadius,
          pointHitRadius: 10,
          pointStyle: pointStyle,
          data: regionValues,
          hidden: hideDataset
        })
    }
  
    let data = {
      labels: years,
      datasets: datasets
    };
    let chartOptions = {
      title: {
        display: true,
        text: title,
        fontFamily: 'Roboto',
        fontSize: 14
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
            },
            scaleLabel: {
              display: true,
              labelString: labelString,
            },
          },
        ],
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function(tooltipItems, data) {
            return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' ' + labelStringShort;
          }
        }
      },
      onHover: function(e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      },      
      onClick: (evt, elements) => {
        // To check if the header is clicked: evt.layerY<36
        //if(this.getElementAtEvent(evt)[0]) {
          this.props.UpdateWorldView('worldLink', this.props.type)
          this.props.UpdateWorldView('worldChartType', title)  
          //this.props.UpdateWorldView('worldYear', years[this.getElementAtEvent(evt)[0]._index])
          this.props.UpdateWorldView('worldYear', 2100)
        //}
      },
    };
  
    if(this.props.scenarioSelection.worldLink===this.state.factor.id) {
      let xAdjustment = 40
      if(this.props.scenarioSelection.worldYear<years[parseInt(years.length/2, 10)]) {
        xAdjustment = -40
      }    
      chartOptions['annotation'] = {
        annotations: [
          {
            type: "line",
            mode: "vertical",
            scaleID: "x-axis-0",
            value: this.props.scenarioSelection.worldYear,
            borderColor: "red",
            label: {
              content: "SELECTED",
              enabled: true,
              position: "top",
              xAdjust: xAdjustment
            }
          }
        ]
      }
    } else {
      chartOptions['annotation'] = {annotations: []}
    }
  
    Chart.defaults.global.legend.display = false;
  
    return (
      <ChartBox>
        <Line data={data} options={chartOptions} />
      </ChartBox>
    );
  };
}

export default MultiLineChart;