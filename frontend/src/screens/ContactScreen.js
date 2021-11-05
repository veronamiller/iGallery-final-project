import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Nav} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {register} from '../actions/userActions'
import Form from 'react-bootstrap/Form'
import FormContainer from '../components/FormContainer.js'

const ContactScreen = ({location, history}) => {


    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [messageTitle, setMessageTitle] = useState(null)
    const [message, setMessage] = useState(null)

    //if calling an action = useDispatch
    //if bringing something in include something = useSelector
    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'


    //if user already exist(logged in) check for userInfo so user don't have to login again
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    //dispatch register
    const submitHandler = (e) => {
        // e.preventDefault()
        dispatch(register(email, fullname, message,messageTitle))
    }

    return (

        <Row>
            <Col md={8}>
                <FormContainer>
                    <h3>General Enquiry</h3>
                    <p>Please complete the fields below and we will respond to your enquiry as soon as possible.</p>
                    {message && <Message variant='success'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}

                    <Form onSubmit={submitHandler}>


                        <Form.Group controlId='fullname'>
                            <Form.Label> Full Name </Form.Label>
                            <Form.Control type='fullname' placeholder='Enter Name' value={fullname}
                                          onChange={(e) => setFullName(e.target.value)}/>
                        </Form.Group>


                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder=' Email Address' value={email}
                                          onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId='message'>
                            <Form.Label>Message Title</Form.Label>
                            <Form.Control type='messageTitle' placeholder='Message Title' value={messageTitle}
                                          onChange={(e) => setMessageTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId='message'>
                            <Form.Label>Message</Form.Label>
                            <Form.Control type='message' placeholder='Message' value={message}
                                          onChange={(e) => setMessage(e.target.value)}/>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            SUBMIT ENQUIRY
                        </Button>

                    </Form>

                    <Row className='py-4'>
                        <Col>
                            Have an Account
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='px-2'>
                                Login
                            </Link>
                        </Col>
                    </Row>
                </FormContainer>
            </Col>

            <Col md={4}>
                <FormContainer>
                    <h3>Contact</h3>
                    <h5>Address</h5>
                    <p><strong>iGallery</strong><br/>40 Dover Street <br/>London<br/>W1S 4PN</p>

                    <h5>TELEPHONE</h5>
                    <p>+44 7944630400</p>

                    <h5>EMAIL</h5>
                    <p>info@igallery.com</p>

                    <h5>FOLLOW US</h5>
                    <Nav.Link href='https://instagram.com'>
                        <i className='fab fa-instagram fa-spin fa-3x'/>
                    </Nav.Link>

                </FormContainer>
            </Col>
        </Row>
    )
}

export default ContactScreen