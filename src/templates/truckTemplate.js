import React from 'react'
import Layout from "../components/layout"
import styled from 'styled-components'
import TruckItem from '../components/TruckItem'
import { graphql } from 'gatsby'

const truckTemplate = (props) => {
    console.log("Template data",props.data)
    return (
        <Layout>
            <TruckItem
                truckImage={props.pageContext.localImage.childImageSharp.fixed}
                brand={props.pageContext.brand}
                driverName={props.pageContext.driver.name}
                truckRegistration={props.pageContext.registration}
                tyreCondition={props.pageContext.condition}
            />
        </Layout>
    )
}

export const query = graphql`
    query TruckQuery($truckId: String!) {
        truck(id:{eq:$truckId}){
            registration
        }
    }
`;

export default truckTemplate;