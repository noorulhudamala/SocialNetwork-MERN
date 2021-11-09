import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom';


import { useForm } from '../utils/hooks'

const Login = (props) => {

    let navigate = useNavigate();
    const loginUserCallback = () => loginUser()
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        userName: "",
        password: "",
    })
    const [errors, setErrors] = useState({})

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
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
                <h1>Login</h1>
                <Form.Input type="text" label={"Username"} placeholder="Username..." name="userName" value={values.userName} onChange={onChange} error={errors?.userName ? true : false} />
                <Form.Input type="password" label={"Password"} placeholder="Password..." name="password" value={values.password} onChange={onChange} error={errors?.password ? true : false} />
                <Button type="submit" primary>Login</Button>
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

const LOGIN_USER = gql`
mutation login(
    $userName: String!
    $password: String!
) {
    login(
            userName: $userName password: $password
    ){
        id email userName createdAt token
    }
}`
export default Login;
