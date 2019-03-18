import React from 'react'
import PropTypes from 'prop-types'
import {Chart, Line} from 'react-chartjs-2'
import ChartBox from '../components/ChartBox'
import OneLineDefaultData from '../data/oneLineDefaultData'

class OneLineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scenarioValuesAllRegions : OneLineDefaultData[this.props.type].scenarioValuesAllRegions,
      factor : OneLineDefaultData[this.props.type].factor
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
    
    let title = this.state.factor.title;
    let labelString = this.state.factor.unit;
    let labelStringShort = this.state.factor.unitShort;
    let goalLabel = "unknown";
    let mainLabel = "unknown";
    let goalVisible = false;
    let goal = 0;
    let min= 0;
    let stepSize = 0;
    let decimals = 0;

    switch(factorId) {
      case 0:
        goalLabel = '1.5 degree target'
        goal = 1.5
        goalVisible = true
        min = -1
        stepSize = 1
        mainLabel = "Temperature Increase"
        decimals = 1
        break
      case 1:
        goalLabel = '1.0 earths available'
        goal = 1.0
        goalVisible = true
        min = 0
        stepSize = 1
        mainLabel = "Required earths"
        decimals = 1
        break
      case 4:
        mainLabel = "World"
        decimals = 0
        break
      case 6:
        mainLabel = "World"
        decimals = 3
        break
      default:
        title = "Unspecified"
        labelString= "unspecified"
        mainLabel = "unspecified"
    }

    let scenarioValues = this.state.scenarioValuesAllRegions.filter(e => (e.regionId==="0" || e.regionId===undefined))
    let datasets = [
      {
        label: mainLabel,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'black',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'black',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'black',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: scenarioValues.map(e => e.scenarioValue.toFixed(decimals)),
      }
    ];
    if(goalVisible) {
      datasets.push({
        label: goalLabel,
        pointRadius: 0,
        data: [goal, goal, goal, goal, goal, goal, goal, goal, goal, goal, goal, goal]
      });
    }
    let years = scenarioValues.map(e => e.year)

    let data = {
      labels: years,
      datasets: datasets
    };

    let chartOptions = {
      title: {
        display: true,
        text: title,
        fontFamily: "Roboto",
        fontSize: 14,
      },
      scales: {
        yAxes: [
          {
            ticks:
            {
              min: min,
              stepSize: stepSize
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
          // Clicked a data point
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
            borderWidth: 2,
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
    )
  }
}

export default OneLineChart;