const path = require('path')

exports.createPages = ({graphql,actions}) => {
    const {createPage} = actions;
    const truckTemplate = path.resolve('src/templates/truckTemplate.js')
    return graphql(`
    {
        allTruck {
          edges {
            node {
              brand
              comments
              condition
              date
              datesignoff
              driversignoff
              endtime
              odo
              pressure
              registration
              replacement
              starttime
              techniciansignoff
              thread
              threadpattern
              torquewheelnuts
              trackingno
              tyremovementinorder
              id
              localImage {
                publicURL
              }
              driver {
                name
              }
            }
          }
        }
      }
    `).then((result) => {
        if(result.errors){
            throw result.errors
        }

        result.data.allTruck.edges.forEach(truck => {
            createPage({
                path:`/truck/${truck.node.id}`,
                component:truckTemplate,
                context:truck.node
            })
        })
    })
}