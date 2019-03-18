var client = require('graphql-client')({
  url: 'http://localhost:1337'
})
const writeJsonFile = require('write-json-file');

for(var populationId = 6; populationId<7; populationId++) {
  for(var affluenceId = 0; affluenceId<10; affluenceId++) {
    for(var technologyId = 0; technologyId<3; technologyId++) {
      for(var dietId = 0; dietId<3; dietId++) {
        let promises = []

        for(var factor1=0; factor1<2; factor1++) {
          var variables1 = {
            populationId: populationId,
            affluenceId: affluenceId,
            technologyId: technologyId,
            dietId: dietId,
            factorId: factor1
          }
          let factor = factor1
          promises.push(
            client.query(`
            query OneLineQuery($factorId:ID!, $populationId: ID!, $affluenceId: ID!, $technologyId: ID!, $dietId: ID!) {
              scenarioValuesAllRegions(factorId:  $factorId, populationId: $populationId, affluenceId: $affluenceId, technlogyId: $technologyId, dietId: $dietId) {
                regionId
                year
                scenarioValue
              },
              factor(id: $factorId) {
                id
                unit
                unitShort
                title
              }
            }
              `, variables1, function(req, res) {
                if(res.status === 401) {
                  throw new Error('Not authorized')
                }
              }
            )
            .then(function(body) {
              let body2 = JSON.parse(JSON.stringify(body).replace("\"data\":", "\""+factor+"\":"))
              return body2
            })
            .catch(function(err) {
              console.log(err.message)
            })      
          )
        }

        for(var factor2=2; factor2<10; factor2++) {
          var variables2 = {
            populationId: populationId,
            affluenceId: affluenceId,
            technologyId: technologyId,
            dietId: dietId,
            factorId: factor2,
          }
          let factor = factor2
          promises.push(
            client.query(`
            query MultiLinesQuery($factorId:ID!, $populationId: ID!, $affluenceId: ID!, $technologyId: ID!, $dietId: ID!) {
              scenarioValuesAllRegions(factorId: $factorId, populationId: $populationId, affluenceId: $affluenceId, technlogyId: $technologyId, dietId: $dietId) {
                regionId
                year
                scenarioValue
              },
              factor(id: $factorId) {
                id
                unit
                unitShort
                title
              }
            }
            `, variables2, function(req, res) {
              if(res.status === 401) {
                throw new Error('Not authorized')
              }
            })
            .then(function(body) {
              let body2 = JSON.parse(JSON.stringify(body).replace("\"data\":", "\""+factor+"\":"))
              return body2
            })
            .catch(function(err) {
              console.log(err.message)
            })
          )
        }

        for(var factor3=10; factor3<12; factor3++) {
          var variables3 = {
            populationId: populationId,
            affluenceId: affluenceId,
            technologyId: technologyId,
            dietId: dietId,
            factorId: factor3,
          }
          let factor = factor3
          promises.push(
            client.query(`
            query shareOfPrimaryEnergyQuery($factorId:ID!, $technologyId: ID!) {
              fuelScenarioValuesAllRegions(factorId:  $factorId, technologyId: $technologyId) {
                regionId
                year
                scenarioValue
              },
              factor(id: $factorId) {
                id
                unit
                unitShort
                title
              }
            }
            `, variables3, function(req, res) {
              if(res.status === 401) {
                throw new Error('Not authorized')
              }
            })
            .then(function(body) {
              let body2 = JSON.parse(JSON.stringify(body).replace("\"data\":", "\""+factor+"\":"))
              return body2
            })
            .catch(function(err) {
              console.log(err.message)
            })        
          )
        }

        for(var factor4=12; factor4<13; factor4++) {
          var variables4 = {
            populationId: populationId,
            affluenceId: affluenceId,
            technologyId: technologyId,
            dietId: dietId,
            factorId: factor4,
          }
          let factor = factor4
          promises.push(
            client.query(`
            query MultiLinesQuery($factorId:ID!, $populationId: ID!, $affluenceId: ID!, $technologyId: ID!, $dietId: ID!) {
              scenarioValuesAllRegions(factorId: $factorId, populationId: $populationId, affluenceId: $affluenceId, technlogyId: $technologyId, dietId: $dietId) {
                regionId
                year
                scenarioValue
              },
              factor(id: $factorId) {
                id
                unit
                unitShort
                title
              }
            }
            `, variables4, function(req, res) {
              if(res.status === 401) {
                throw new Error('Not authorized')
              }
            })
            .then(function(body) {
              let body2 = JSON.parse(JSON.stringify(body).replace("\"data\":", "\""+factor+"\":"))
              return body2
            })
            .catch(function(err) {
              console.log(err.message)
            })
          )
        }

        let fileName=populationId+'-'+affluenceId+'-'+technologyId+'-'+dietId+'.json'

        Promise.all(promises)
          .then(function(bodies) {
            writeJsonFile(fileName, bodies).then(() => {
              console.log(fileName)
            })
          })
          .catch(function(err) {
            console.log(err.message)
          })
      }
    }
  }
}
