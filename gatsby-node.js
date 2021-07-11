const path = require('path')

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "develop-html" || stage === "build-html") {
    actions.setWebpackConfig({
      resolve: {
        mainFields: ["main"],
      },
    })
  } else {
    actions.setWebpackConfig({
      resolve: {
        mainFields: ["browser", "module", "main"],
      },
    })
  }
}

exports.createPages = ({graphql,actions}) => {
    const {createPage} = actions;
    const TruckTemplate = path.resolve('src/templates/TruckTemplate.js')
    return graphql(`
    {
        allTruck {
          edges {
            node {
              id
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
                component:TruckTemplate,
                context:{truckId: truck.node.id}
            })
        })
    })
}