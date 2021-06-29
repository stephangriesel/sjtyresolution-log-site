import React from 'react'
import styled from "styled-components"

const TruckItem = ({brand, driverName, truckRegistration, tyreCondition, children}) => {
    return (
        <TruckItemWrapper>
            <h2>{truckRegistration}</h2>
            <span>{tyreCondition}</span>
            {/* <span>{brand}</span> */}
            <div className="btn">
                {children}
            </div>
        </TruckItemWrapper>
    )
}

const TruckItemWrapper = styled.section `
    display:flex;
    align-content:center;
    align-items:center;
    justify-content:space-evenly;
    border:1px solid black;
    background:#ECEFE9;
    margin:0.5em 0;
    h2 {
        margin:0.5em 0;
        padding:0;
    }
    .btn {
        padding:0.5em;
        background:transparent;
        transition: ease-in 0.5s;
        border: 1px solid #000;
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

export default TruckItem