import React, { useEffect, useContext, useState} from 'react';
import { FirebaseContext } from '../components/Firebase';
import {Form, Input, Button} from '../components/common';
import styled from 'styled-components';

let fileReader
if(typeof window !== 'undefined'){
    fileReader = new FileReader();
}

const AddTruck = () => {
    const {firebase} = useContext(FirebaseContext);
    const [drivers, setDrivers] = useState([]);
    const [truckImage, setTruckImage] = useState('');
    const [truckRegistration, setTruckRegistration] = useState('');
    const [driverId, setDriverId] = useState('');
    const [condition, setCondition] = useState('');
    const [odo, setOdo] = useState('');
    const [pressure, setPressure] = useState('');
    const [success, setSuccess] = useState(false);

    let isMounted = true;

    useEffect(() => {
        return () => {
            isMounted = false;
        }
    }, [])

    useEffect(() => {
        fileReader.addEventListener('load', () => {
            setTruckImage(fileReader.result)
        })
    }, [])


    useEffect(() => {
        // query all available drivers
            if(firebase){
            firebase.getDrivers().then(snapshot => {
                if(isMounted){
                console.log("Add Truck Snapshot: ", snapshot)
                const availableDrivers = [];
                snapshot.forEach(doc => {
                    availableDrivers.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

                setDriverId(availableDrivers[0].id);
                setDrivers(availableDrivers);
            }
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
            firebase.createTruck({
                truckImage,
                truckRegistration,
                driverId,
                condition,
                odo,
                pressure
            }).then(() => {
                if(isMounted){
                setSuccess(true)
                }
            })
        }}>
            <FormField>
                <Input 
                    placeholder="Truck registration"
                    value={truckRegistration}
                    onChange={e => {
                        e.persist();
                        setSuccess(false);
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
                        setSuccess(false);
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
                    setSuccess(false);
                    fileReader.readAsDataURL(e.target.files[0])
                }}/>
            </FormField>
            <FormField>
                <strong>
                    Condition
                </strong>
                <Input 
                    placeholder="Condition" 
                    value={condition} 
                    onChange={e => {
                        e.persist();
                        setSuccess(false);
                        setCondition(e.target.value);
                    }} />
            </FormField>
            <FormField>
                <strong>
                    Tyre Pressure
                </strong>
                <Input 
                    placeholder="Tyre Pressure" 
                    value={pressure} 
                    onChange={e => {
                        e.persist();
                        setSuccess(false);
                        setPressure(e.target.value);
                    }} />
            </FormField>
            <FormField>
                <strong>
                    Odometer
                </strong>
                <Input 
                    placeholder="Odometer" 
                    value={odo} 
                    onChange={e => {
                        e.persist();
                        setSuccess(false);
                        setOdo(e.target.value);
                    }} />
            </FormField>
            {!!success && 
            <span>
                New truck added successfully!
            </span>
            }
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