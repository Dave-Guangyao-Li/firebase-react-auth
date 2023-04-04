// signup component, renders a signup form, and a button to submit the form
import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext' // this is the custom hook that is used to access the context object

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth() // this is the signup function that is passed to the context object
    const [error, setError] = useState('') // this is the error message that is displayed if there is an error
    const [loading, setLoading] = useState(false) // this is used to disable the button when the form is submitted


    async function handleSubmit(e) { // this is the function that is called when the form is submitted
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) { // if the password and the password confirmation do not match, return
            return setError('Passwords do not match')
        }

        try {
            setError('') // if there is an error, set the error message to an empty string
            setLoading(true) // set loading to true, this will disable the button
            await signup(emailRef.current.value, passwordRef.current.value) // await is used to wait for the promise to resolve, if the promise is rejected, the error will be caught in the catch block
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false) // set loading to false, this will enable the button

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {/* {currentUser && currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-4">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Log In
            </div>
        </>
    )
}
