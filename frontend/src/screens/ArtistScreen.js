import React ,{useState, useEffect}from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import { productListReducer } from '../reducers/productReducers'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ArtistScreen = ({ history,match}) => {

        const [qty, setQty] = useState(1)//Quantity

        const dispatch = useDispatch()
    
        const productDetails = useSelector((state) => state.productDetails)
        const { loading, error, product } = productDetails
    
        useEffect(() => {
            dispatch(listProductDetails(match.params.id))
        },[dispatch, match])
    
        const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
        }
    return (
        <div>
        <div className='latest-artwork'>
            <h4>Latest Artworks</h4>
        </div>
                <Card className='my-3 p-3 rounded'>
                
                <Card.Img src={product.image} alt={product.name} fluid/>
                
                <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                    <Card.Title as='div'>
                        <strong>{product.artist}</strong>
                    </Card.Title>
                <Card.Text as='div'>
                    <div className='my-2'>
                        {product.year} 
                    </div>
                </Card.Text>
                <Card.Text>
                    <div className='my-3'>
                        {product.description}
                    </div>
                </Card.Text>
                <Card.Text as='h3'>{product.price}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ArtistScreen
