import React, {useEffect}from 'react'
import  {Link} from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import {useDispatch, useSelector} from 'react-redux'


const ProductCarousel = () => {
    return (
        <div>
            <Carousel fade className='pt-3' >
            <Carousel.Item >
                <img
                className="slide"
                src='http://localhost:3000/images/canvas16.jpg'
                alt="artist name"
                fluid/>
          <Carousel.Caption>
            <p>1 Artwork</p>
           </Carousel.Caption>
            </Carousel.Item>
  <Carousel.Item>
    <img
      className="slide"
      src="http://localhost:3000/images/canvas8.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <p>2 Artwork</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="slide"
      src="http://localhost:3000/images/canvas18.jpg"
      alt="Third slide"
    />

    <Carousel.Caption clasName='light'>
      <p>3 Artwork</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
    )
}

export default ProductCarousel
