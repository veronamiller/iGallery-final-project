import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; iGallery
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
 
export default Footer;