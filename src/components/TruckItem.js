import React from 'react'
import styled from "styled-components"

const TruckItem = ({driverName, truckRegistration, tyreCondition, children}) => {
    return (
        <TruckItemWrapper>
            <h2>{truckRegistration} - {driverName}</h2>
            <span>{tyreCondition}</span>
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
        a {
            color:#FFF;
            font-family:arial;
            text-decoration:none;
        }
        &:hover {
            background:#2A427A;
        }
    }
`

export default TruckItem