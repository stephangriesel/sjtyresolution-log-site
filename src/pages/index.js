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
        <TruckItem 
          truckImage={edge.node.localImage.childImageSharp.fixed}
          driverName={edge.node.driver.name}
          truckRegistration={edge.node.registration}
          tyreCondition={edge.node.condition}
          odo={edge.node.odo}
          key={edge.node.id}>
        <Link to={`/truck/${edge.node.id}`}>Details</Link>
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
          brand
          condition
          odo
          registration
          id
          localImage {
            childImageSharp {
              fixed(width:200){
                ...GatsbyImageSharpFixed
              }
            } 
          }
          driver {
            name
          }
        }
      }
    }
  }
`

export default IndexPage
