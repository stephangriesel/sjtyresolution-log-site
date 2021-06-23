import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import styled from "styled-components"

const IndexPage = props => {
  console.log("test data", props)
  return (
    <Layout>
      <Seo title="Home" />
      {props.data.allTruck.edges.map(edge => (
        <Item key={edge.node.id}>
          <h2>
            {edge.node.registration} - {edge.node.driver.name}
          </h2>
          <h2>{edge.node.condition}</h2>
          <Link to={`/truck/${edge.node.id}`}>Comments</Link>
        </Item>
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

const Item = styled.nav`
  display:flex;
`

export default IndexPage
