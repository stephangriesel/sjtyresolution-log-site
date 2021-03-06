import React, {useState, useContext, useEffect} from 'react'
import {Form, Input, Button, ErrorMessage} from '../components/common'
import {FirebaseContext} from '../components/Firebase'

const Register = () => {
  const {firebase} = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    email:'',
    password:'',
    confirmPassword:'',
    username:''
  });

  let isMounted = true;

  useEffect(() => {
      return () => {
          isMounted = false;
      }
  }, [])

  function handeInputChange(e){
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }
  function handleSubmit (e){
    e.preventDefault();

    if(formValues.password === formValues.confirmPassword) {
      firebase.register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password
      }).catch(error => {
        if(isMounted){
        setErrorMessage(error.message);
        }
      })
    } else {
      setErrorMessage('Password fields not matching, try again!')
    }
    console.log("Form entries", formValues)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input onChange={handeInputChange} value={formValues.username} type="text" placeholder="username" required name="username"/>
      <Input onChange={handeInputChange} value={formValues.email} type="email" placeholder="email" required name="email"/>
      <Input onChange={handeInputChange} value={formValues.password} type="password" placeholder="password" required minLength={7} name="password"/>
      <Input onChange={handeInputChange} value={formValues.confirmPassword} type="password" placeholder="confirm password" required minLength={7} name="confirmPassword"/>
      {!!errorMessage && 
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      }
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}

export default Register