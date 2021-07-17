import React, {useState, useContext} from 'react';
import {Form, Input, Button} from '../components/common';
import { FirebaseContext } from '../components/Firebase';

const AddDriver = () => {
    const {firebase} = useContext(FirebaseContext);
    const [driverName, setDriverName] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        firebase.createDriver({
            driverName
        }).then(() => {
            setDriverName(' ');
            setSuccess(true);
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={(e) => {
                e.persist();
                setSuccess(false);
                setDriverName(e.target.value);
            }}
            value={driverName}
            placeholder="Driver Name" 
            />
            {!!success && 
            <span>
                Driver created successfully!
            </span>
            }
            <Button type="submit" block>
                Add new driver
            </Button>
        </Form>
    );
}

export default AddDriver;