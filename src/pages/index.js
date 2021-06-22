import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = props => {
  console.log("test data", props)
  return (
    <Layout>
      <Seo title="Home" />
      {props.data.allTruck.edges.map(edge => (
        <div key={edge.node.id}>
          <h2>
            {edge.node.registration} - {edge.node.driver.name}
          </h2>
          <div>
            <h2>{edge.node.condition}</h2>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const quert = graphql`
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
`

export default IndexPage
