exports.createPages = ({graphql,actions}) => {
    const {createPage} = actions;
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
                component:null,
                context:truck.node
            })
        })
    })
}