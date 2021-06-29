import React from 'react'
import Layout from "../components/layout"
import styled from 'styled-components'
import TruckItem from '../components/TruckItem'

const truckTemplate = (props) => {
    console.log("test truck template props",props)
    return (
        <Layout>
            <TruckItem
            brand={props.pageContext.brand}
            driverName={props.pageContext.driver.name}
            truckRegistration={props.pageContext.registration}
            tyreCondition={props.pageContext.condition}
            />

        </Layout>
    )
}

export default truckTemplate;