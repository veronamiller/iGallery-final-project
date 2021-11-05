import React, { useEffect} from 'react'
import { Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({match}) => {
    const pageNumber = match.params.pageNumber || 1
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList) //useSelector grabs from State
    const {loading, error, products, page, pages} = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])


    return (
        
        <div>
            {!keyword && <ProductCarousel/>}
            <h4>Welcome to iGallery</h4>
            <h5>Latest Artworks</h5>
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
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                
        </div>
    )
}

export default HomeScreen
