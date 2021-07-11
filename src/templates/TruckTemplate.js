import React, { useContext } from 'react'
import { TruckDetailsAndComments } from '../components/common'
import TruckItem from '../components/TruckItem'
import {FirebaseContext} from '../components/Firebase'
import { graphql } from 'gatsby'

const TruckTemplate = (props) => {
    console.log("Template data: ",props.data)
    // console.log("Firebase Context data: ", )
    const {firebase} = useContext(FirebaseContext)
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
            {!!firebase && 
            <TruckDetailsAndComments 
                firebase={firebase}
                truckId={props.data.truck.id}
            />
          }
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

export default TruckTemplate;