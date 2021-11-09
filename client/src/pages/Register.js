import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom';


import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth';

const Register = (props) => {

    const context = useContext(AuthContext)
    let navigate = useNavigate();
    const registerUser = () => addUser()
    const { onChange, onSubmit, values } = useForm(registerUser, {
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData)
            navigate('/')
        },
        onError: (err) => {
            setErrors(err?.graphQLErrors[0]?.extensions?.errors)
        },
        variables: values
    })
    

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input type="text" label={"Username"} placeholder="Username..." name="userName" value={values.userName} onChange={onChange} error={errors?.userName ? true : false} />
                <Form.Input type="email" label={"Email"} placeholder="Email..." name="email" value={values.email} onChange={onChange} error={errors?.email ? true : false} />
                <Form.Input type="password" label={"Password"} placeholder="Password..." name="password" value={values.password} onChange={onChange} error={errors?.password ? true : false} />
                <Form.Input type="password" label={"Confirm Password"} placeholder="Confirm Password..." name="confirmPassword" value={values.confirmPassword} onChange={onChange} error={errors?.confirmPassword ? true : false} />
                <Button type="submit" primary>Register</Button>
            </Form>
            {Object.keys(errors).length > 0 ?
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
                : null}

        </div>
    )
}

const REGISTER_USER = gql`
mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    register(
        registerInput: {
            userName: $userName
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ){
        id email userName createdAt token
    }
}`
export default Register;
