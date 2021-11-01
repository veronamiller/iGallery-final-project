import React, {useState, useEffect}from 'react'
import { Link} from 'react-router-dom'
import { Button, Row, Col }from'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { register } from '../actions/userActions'
import Form from 'react-bootstrap/Form'
import FormContainer from '../components/FormContainer.js'

const RegisterScreen = ({location, history}) => {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    //if calling an action = useDispatch
    //if bringing something in include something = useSelector
    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'


    //if user already exist(logged in) check for userInfo so user don't have to login again
    useEffect(() =>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    //dispatch register
    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{  
        dispatch(register(username, email, password, name, country, city))}
    }

    return (
        <FormContainer >
            <h3>Sign Up</h3>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='username' placeholder='Enter Username' value={username}
                    onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Public Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Public Name' value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='country' placeholder='Enter Country' value={country}
                    onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='city' placeholder='Enter City' value={city}
                    onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

             
               
                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>
            <Row className='py-4'>
                <Col>
                Have an Account
                <Link to={redirect ? `/login?redirect=${redirect}`: '/login' } className='px-2'>
                     Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
