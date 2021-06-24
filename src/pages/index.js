import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import TruckItem from '../components/TruckItem'

const IndexPage = props => {
  console.log("test data", props)
  return (
    <Layout>
      <Seo title="Home" />
      {props.data.allTruck.edges.map(edge => (
        <TruckItem key={edge.node.id}>
          <h2>
            {edge.node.registration} - {edge.node.driver.name}
          </h2>
          <h2>{edge.node.condition}</h2>
          <Link to={`/truck/${edge.node.id}`}>Comments</Link>
        </TruckItem>
      ))}
    </Layout>
  )
}

export const query = graphql`
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
