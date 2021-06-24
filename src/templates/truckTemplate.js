import React from 'react'
import Layout from "../components/layout"
import styled from 'styled-components'
import TruckItem from '../components/TruckItem'

const truckTemplate = (props) => {
    console.log("test truck template props",props)
    return (
        <Layout>
            <TruckItem>
                <h2>{props.pageContext.registration} - {props.pageContext.driver.name}</h2>
                <span>{props.pageContext.condition}</span>
            </TruckItem>
        </Layout>
    )
}

export default truckTemplate;