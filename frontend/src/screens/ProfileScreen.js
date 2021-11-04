import React, {useState, useEffect}from 'react'
import { Button, Row, Col }from'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails , updateUserProfile} from '../actions/userActions'
import Form from 'react-bootstrap/Form'


const ProfileScreen = ({ history}) => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    //if calling an action = useDispatch
    //if bringing something in include something = useSelector
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {success} = userUpdateProfile

    

   


    //if user already exist(logged in) check for userInfo so user don't have to login again
    useEffect(() =>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setUsername(user.username)
                setName(user.name)
                setCountry(user.country)
                setCity(user.city)
                setEmail(user.email)
            }
        }
    },[dispatch,history, userInfo, user])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{  
            dispatch(updateUserProfile({id: user._id,username, email, password, name, country, city}))
        }
    }

    return (
    <Row className='justify-content-center'>
        <Col md={5} >
        <h4>User Profile</h4>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>
            {error}</Message>}
            {success && <Message variant='success'>
            Profile Updated</Message>}
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
                    Update
                </Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2></h2>
        </Col>
    </Row>
    )
}

export default ProfileScreen

