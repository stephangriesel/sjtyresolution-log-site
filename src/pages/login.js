import React, {useState, useContext, useEffect} from "react"
import { Link } from "gatsby"
import { FirebaseContext } from "../components/Firebase"
import Seo from "../components/seo"
import {Form, Input, Button, ErrorMessage} from '../components/common'

const Login = () => {
    const [formValues, setFormValues] = useState({email: '', password: ''});
    const {firebase} = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');
    let isMounted = true;

    useEffect(() => {
        return () => {
            isMounted = false;
        }
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        firebase.login({email:formValues.email, password: formValues.password }).catch(error => {
            if(isMounted){
            console.log("Login Validation Error: ", error)
            setErrorMessage(error.message);
            }
        })
    }
    
    function handleInputChange(e){
        e.persist();
        setErrorMessage('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return(
    <section>
        <Form onSubmit={handleSubmit}>
            <Input required value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="email"></Input>
            <Input required value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password"></Input>
            {!!errorMessage &&
            <ErrorMessage>
                <p>{errorMessage}</p>
            </ErrorMessage>
            }
            <Button type="submit" block>Login</Button>
        </Form>
    </section>
    )}

export default Login
