import React from 'react'
import Layout from "../components/layout"

const truckTemplate = (props) => {
    console.log("test truck template props",props)
    return (
        <Layout>
            <section>
                <h2>{props.pageContext.registration} - {props.pageContext.driver.name}</h2>
                <span>{props.pageContext.condition}</span>
            </section>
        </Layout>
    )
}

export default truckTemplate;