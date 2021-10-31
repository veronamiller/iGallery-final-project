import React, { useEffect} from 'react'
import { Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList) //useSelector grabs from State
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])


    return (
        <div>
            <h2>Welcome to iGallery</h2>
            <h4>Latest Artworks</h4>
            {loading ? (
            <Loader/>
            ): error ? (
            <Message variant='danger'>{error}</Message>
            ):( 
            <Row>
                {products.map((product) =>(
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
                </Row>)}
        </div>
    )
}

export default HomeScreen
