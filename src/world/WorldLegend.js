
const chartThresholds = [
  {chartType: 0, threshold: 1.5},
  {chartType: 1, threshold: 1},
  {chartType: 2, threshold: 1},
  {chartType: 3, threshold: 600},
  {chartType: 4, threshold: 40000},
  {chartType: 5, threshold: 10},
  {chartType: 6, threshold: 0.5},
  {chartType: 7, threshold: 7000},
  {chartType: 8, threshold: 0.5},
  {chartType: 9, threshold: 0.5},
  {chartType: 10, threshold: 0.5},
  {chartType: 11, threshold: 0.5},
  {chartType: 12, threshold: 50},
]

export default (chartType, scenarioValue) => {
  let threshold = chartThresholds[chartType].threshold
  let regionColor = "green"
  if(scenarioValue.scenarioValue>threshold) {
    regionColor = "red"
  }
  return ({
    "region": scenarioValue.regionId,
    "scenarioValue": scenarioValue.scenarioValue,
    "regionColor": regionColor
  })
}