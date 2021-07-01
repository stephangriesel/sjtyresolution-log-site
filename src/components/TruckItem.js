import React from 'react'
import styled from "styled-components"

const TruckItem = ({brand, driverName, truckImage, truckRegistration, tyreCondition, children}) => {
    return (
        <TruckItemWrapper>
            <TruckImage>
                <img src={truckImage} alt="Truck" />
            </TruckImage>
            <TruckContent>
                <h2>{truckRegistration}</h2>
                <span>{tyreCondition}</span>
                {/* <span>{brand}</span> */}
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

const TruckImage = styled.div`
    max-width:200px;
`;

const TruckContent = styled.div`

`;

export default TruckItem