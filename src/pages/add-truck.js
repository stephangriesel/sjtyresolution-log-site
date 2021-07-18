import React, { useEffect, useContext, useState} from 'react';
import { FirebaseContext } from '../components/Firebase';
import {Form, Input, Button} from '../components/common';
import styled from 'styled-components'

const fileReader = new FileReader();

const AddTruck = () => {
    const {firebase} = useContext(FirebaseContext);
    const [drivers, setDrivers] = useState([]);
    const [truckImage, setTruckImage] = useState('');
    const [truckRegistration, setTruckRegistration] = useState('');
    const [driverId, setDriverId] = useState('');

    useEffect(() => {
        fileReader.addEventListener('load', () => {
            setTruckImage(fileReader.result)
        })
    }, [])


    useEffect(() => {
        // query all available drivers
            if(firebase){
            firebase.getDrivers().then(snapshot => {
                console.log("Add Truck Snapshot: ", snapshot)
                const availableDrivers = [];
                snapshot.forEach(doc => {
                    availableDrivers.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setDrivers(availableDrivers);
            })
        }
    }, [firebase])

    console.log("Current Drivers in array: ", drivers)
    return(
        <Form onSubmit={(e) => {
            e.preventDefault();
            console.log("Truck Image: ", truckImage);
            console.log("Truck Registration: ", truckRegistration);
            console.log("Truck Driver: ", driverId);
        }}>
            <FormField>
                <Input 
                    placeholder="Truck registration"
                    value={truckRegistration}
                    onChange={e => {
                        e.persist();
                        setTruckRegistration(e.target.value)
                    }}
                />
            </FormField>
            <FormField>
                <strong>Driver</strong>
                <div>
                <select
                    value={driverId}
                    onChange={e => {
                        e.persist();
                        setDriverId(e.target.value)
                    }}
                >
                    {drivers.map(d => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
                </select>
                </div>
            </FormField>
            <FormField>
                <strong>Truck Image</strong>
                <Input type="file" onChange={e => {
                    e.persist();
                    fileReader.readAsDataURL(e.target.files[0])
                }}/>
            </FormField>
            <Button block type="submit">
                Add new truck
            </Button>
        </Form>
    )
}

const FormField = styled.div`
    margin-bottom:1em;
`

export default AddTruck;