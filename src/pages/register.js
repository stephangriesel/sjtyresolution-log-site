import React from 'react'
import {Form, Input, Button} from '../components/common'

const Register = () => {
  function handleSubmit (e){
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="email" placeholder="email" required />
      <Input type="password" placeholder="password" required minLength={7}/>
      <Input type="password" placeholder="confirm password" required minLength={7}/>
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}

export default Register