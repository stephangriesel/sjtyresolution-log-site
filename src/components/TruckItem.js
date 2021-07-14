import React from 'react'
import styled from "styled-components"

import Img from 'gatsby-image'

const TruckItem = ({brand, driverName, truckImage, truckRegistration, tyreCondition, children, odo}) => {
    return (
        <TruckItemWrapper>
            <TruckImage>
                <Img fixed={truckImage}/>
            </TruckImage>
            <TruckContent>
                <h2>{truckRegistration}</h2>
                <div>Odometer: {odo}</div>
                <div>Tyre Condition: {tyreCondition}</div>
                <div className="btn">
                    {children}
                </div>
            </TruckContent>
        </TruckItemWrapper>
    )
}

const TruckItemWrapper = styled.section `
    display:flex;
    align-content:center;
    align-items:center;
    justify-content:space-evenly;
    border:1px solid black;
    background:#f5f5f5;
    margin:0.5em 0;
    h2 {
        margin:0.5em 0;
        padding:0;
    }
    .btn {
        padding:0.5em;
        margin:0.5em;
        background:transparent;
        transition: ease-in 0.5s;
        border: 0px solid #000;
        a {
            background:transparent;
            color:#000;
            font-family:arial;
            text-decoration:none;
            padding:0.5em;
            &:hover {
                color:#fff;
            }
        }
        &:hover {
            background:#312d6f;
        }
    }
`

const TruckImage = styled.div`
    max-width:200px;
`;

const TruckContent = styled.div`
    display:flex;
    flex-direction:column;
    text-align:center;
    font-family:arial;
    .small {
        font-size:0.8em;
    }
    p {
        margin:0;
    }

`;

export default TruckItem