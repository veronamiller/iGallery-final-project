import React, {useState, useEffect}from 'react'
import { Table, Form, Button, Row, Col }from'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails , updateUserProfile} from '../actions/userActions'
import { listMyOrders} from '../actions/orderActions'



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

    const orderListMy = useSelector((state) => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    
    //if user already exist(logged in) check for userInfo so user don't have to login again
    useEffect(() =>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
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
    <Row>
        <Col md={4} >
        <h2>User Profile</h2>
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

        <Col md={8}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? 
            <Message variant='danger'>
                {errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}€</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </Col>
    </Row>
    )
}

export default ProfileScreen

