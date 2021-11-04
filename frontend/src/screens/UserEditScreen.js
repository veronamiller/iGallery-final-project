import React, {useState, useEffect}from 'react'
import { Link} from 'react-router-dom'
import { Button, Form }from'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants.js'
import FormContainer from '../components/FormContainer.js'

const UserEditScreen = ({match, history}) => {

    const userId = match.params.id

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    //if calling an action = useDispatch
    //if bringing something in include something = useSelector
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate



    //if user already exist(logged in) check for userInfo so user don't have to login again
    useEffect(() =>{
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else {
            if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))
        } else {
            setUsername(user.username)
            setName(user.name)
            setEmail(user.email)
            setCity(user.city)
            setCountry(user.country)
            setIsAdmin(user.isAdmin)
            }
        }
        
    },[user, userId, dispatch, successUpdate, history])

    //dispatch register
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, 
                            email, username, country,
                            city, isAdmin}))
    }

    return (
        <>
        <Link to='/admin/userList' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer >
            <h3>Edit User</h3>
            {loadingUpdate && <Loader/> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>
                {error}
            </Message> : (
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

                    <Form.Group controlId='isadmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
    
                </Form>
            )}
            
            
            
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen
