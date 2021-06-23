const path = require('path')

exports.createPages = ({graphql,actions}) => {
    const {createPage} = actions;
    const truckTemplate = path.resolve('src/templates/truckTemplate.js')
    return graphql(`
    {
        allTruck {
          edges {
            node {
              condition
              registration
              id
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