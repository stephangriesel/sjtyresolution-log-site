import React, {useState} from 'react'
import {Form, Input, Button} from '../components/common'

const Register = () => {
  const [formValues, setFormValues] = useState({
    email:'',
    password:'',
    confirmPassword:''
  })

  function handeInputChange(e){
    e.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }
  function handleSubmit (e){
    e.preventDefault();
    console.log("Form entries", formValues)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input onChange={handeInputChange} value={formValues.email} type="email" placeholder="email" required name="email"/>
      <Input onChange={handeInputChange} value={formValues.password} type="password" placeholder="password" required minLength={7} name="password"/>
      <Input onChange={handeInputChange} value={formValues.confirmPassword} type="password" placeholder="confirm password" required minLength={7} name="confirmPassword"/>
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}

export default Register