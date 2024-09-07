import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import Image from '../../../components/Image'
import Price from '../../../components/Price'
import Button from '../../../components/Button'
import { useDispatch } from 'react-redux'
import {addToCart} from '../../../redux/actions/cartAction'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { getByIdRequest } from '../../../redux/actions/getRequestByIdAction'
import { useNavigate } from 'react-router-dom'
import useSlugify from '../../../hooks/useSlugify'
import { useTranslation } from 'react-i18next';



  function ProductItem({ item }) {
    const dispatch  = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const slugify = useSlugify();
    const {t} = useTranslation();
    const handleAddToCart = (e) => {
      e.stopPropagation();
      setLoading(true);
      setTimeout(() => {
        dispatch(addToCart(item, 'add_to_cart_success')); 
        setLoading(false); 
      }, 1000); 
    };

    const handleProductClick = (product) => {
      const slug = slugify(product.name)
      dispatch(getByIdRequest(product));
      navigate(`/${slug}`);
    };
    
  return (
    <React.Fragment>
      <Card className='p-2 bg-white cursor-pointer' onClick={() => handleProductClick(item)}>
        <CardBody className='p-0'>
          <div className='product__img-container'>
            <Image
              src={item?.image}
              alt={item.name}
              aspectRatio="4 / 3"
            />
          </div>
          <div className='product__info-container mt-2'>
          <Price amount={item.price} currency='TRY' locale='tr-TR' className='font-size-14 text-primary font-weight-300' />
          <h3 className='font-size-14 font-weight-500'>{item.name} </h3>
          <Button variant="primary" size="full" onClick={handleAddToCart} disabled={loading}>
           {loading ? <LoadingSpinner /> : t('buttons.add_to_cart')}
          </Button>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ProductItem