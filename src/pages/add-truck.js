import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FirebaseContext } from '../components/Firebase';

const AddTruck = () => {
    const {firebase} = useContext(FirebaseContext);
    const [drivers, setDrivers] = useState([]);

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
    return(<div />)
}

export default AddTruck;