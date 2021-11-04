import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
import { Button, Form }from'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listProductDetails, updateProduct} from '../actions/productActions'
import FormContainer from '../components/FormContainer.js'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js'

const ProductEditScreen = ({match, history}) => {

    const productId = match.params.id

    const [artist, setArtist] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [year, setYear] = useState(0)
    const [technique, setTechnique] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    //if calling an action = useDispatch
    //if bringing something in include something = useSelector
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate


    useEffect(() =>{
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
          } else {
            if (!product.name || product._id !== productId) {
              dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setArtist(product.artist)
                setImage(product.image)
                setPrice(product.price)
                setYear(product.year)
                setTechnique(product.technique)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    },[product, productId, dispatch, history, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }

    //dispatch register
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            artist,
            image,
            price,
            year,
            technique,
            description,
            countInStock
        }))
    }

    return (
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer >
            <h3>Edit Product</h3>
            {loadingUpdate && <Loader/> }
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (<Loader/>) : error ? (<Message variant='danger'>
                {error}
            </Message> ) : (
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='artist'>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control type='artist' placeholder='Enter Artist Name' value={artist}
                        onChange={(e) => setArtist(e.target.value)}></Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='name'>
                        <Form.Label>Canvas Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Canvas Name' value={name}
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter image url'
                        value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                        <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                        ></Form.File>
                        {uploading && <Loader />}</Form.Group>
    
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter Price' value={price}
                        onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='year'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type='number' placeholder='Enter Year' value={year}
                        onChange={(e) => setYear(e.target.value)}></Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='technique'>
                        <Form.Label>Technique</Form.Label>
                        <Form.Control type='technique' placeholder='Enter Technique' value={technique}
                        onChange={(e) => setTechnique(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='description' placeholder='Enter Description' value={description}
                        onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count in Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter Count in Stock' value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
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

export default ProductEditScreen
