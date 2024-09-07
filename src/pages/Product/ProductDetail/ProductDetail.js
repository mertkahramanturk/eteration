import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import Image from '../../../components/Image'
import { useDispatch, useSelector } from 'react-redux';
import Price from '../../../components/Price';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { addToCart } from '../../../redux/actions/cartAction'
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const { product } = useSelector((state) => state.productDetail);

  const handleAddToCart = (item) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(addToCart(item, 'Item successfully added your cart'));
      setLoading(false);
    }, 1000);
  };


  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  return (
    <Container>
      <Card className="mt-4">
        <CardBody>
          <Row>
            <Col xs={12} lg={6}>
              <Image
                src={product?.image}
                alt={product?.name}
                aspectRatio="4 / 3"
                objectFit="cover"
                classNames='border-radius-5'
              />
            </Col>
            <Col xs={12} lg={6}>
              <div className="product__info-wrapper">
                <h2>{product?.name}</h2>
                <p>{product?.description} </p>
                <Price amount={product?.price} currency='TRY' locale='tr-TR' className='font-size-28 text-primary font-weight-500' />
                <Button variant="primary" size="full" onClick={() => handleAddToCart(product)}>
                  {loading ? <LoadingSpinner /> : 'Add to Cart'}
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  )
}

export default ProductDetail