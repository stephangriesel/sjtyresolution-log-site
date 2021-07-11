import React from 'react'
import { TruckDetailsAndComments } from '../components/common'
import TruckItem from '../components/TruckItem'
import { graphql } from 'gatsby'

const truckTemplate = (props) => {
    console.log("Template data: ",props.data)
    return (
        <section>
            <TruckItem
                truckImage={props.data.truck.localImage.childImageSharp.fixed}
                brand={props.data.truck.brand}
                driverName={props.data.truck.driver.name}
                odo={props.data.truck.odo}
                truckRegistration={props.data.truck.registration}
                tyreCondition={props.data.truck.condition}
            />
            <TruckDetailsAndComments 
                brand={props.data.truck.brand}
            />
        </section>
    )
}

export const query = graphql`
    query TruckQuery($truckId: String!) {
        truck(id:{eq:$truckId}){
            brand
            condition
            registration
            id
            odo
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
`;

export default truckTemplate;