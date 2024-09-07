import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Image from "../../Image";
import Quantity from "../../Quantity";
import Price from "../../Price";
import { clearCart } from '../../../redux/actions/cartAction';
import LoadingSpinner from '../../LoadingSpinner'
import useSlugify from "../../../hooks/useSlugify";
import { getByIdRequest } from "../../../redux/actions/getRequestByIdAction";

function TopbarRightBasket() {
  const dispatch = useDispatch();
  const slugify = useSlugify();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const dropdownRef = useRef(null);
  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };

  const useOnHoverOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, [ref, handler]);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(clearCart('Your order has been received successfully'));
      localStorage.setItem("cart", JSON.stringify([]));

    }, 1000);
  };


  const handleProductClick = (product) => {
    const slug = slugify(product.name)
    dispatch(getByIdRequest(product));
    navigate(`/${slug}`);
  };


  return (
    <li className="mb-0" ref={dropdownRef}>
      <div type="button" className="btn-icon d-flex align-items-baseline">
        {totalItems > 0 ? (
          <div className="d-flex position-relative">
            <span className="basket-count rounded-circle">{totalItems}</span>
            <i
              className="fas fa-shopping-basket text-white"
              onMouseOver={() => setMenuDropDownOpen(true)}
            />
          </div>
        ) : (
          <i
            className="fas fa-shopping-basket text-white"
            onMouseOver={() => setMenuDropDownOpen(true)}
          />
        )}

        {isMenuDropDownOpen && (
          <div className="basket-dropdown-menu border-0 mt-3 ">
            <div className="flex-1 ">
              <p className="font-size-14 font-weight-500">
                {totalItems > 0
                  ? `You have ${totalItems} items in your cart`
                  : ""}
              </p>
              {cartItems.length > 0 ? (
                <>
                  <div className="basket-product-wrapper">
                    {cartItems.map((product, key) => (

                      <div className="mt-4 d-flex align-items-center gap-2" key={key}>
                        <div className="avatar pr-2 d-block">
                          <Image
                            src={product.image}
                            height={85}
                            width={85}
                            alt="product"
                            className="border-radius-5"
                          />
                        </div>
                        <div className="d-flex flex-column gap-2">
                          <div
                            onClick={() => handleProductClick(product)}
                            className="text-dark font-size-14 font-weight-600"
                          >
                            {product.name}
                          </div>

                          <div>
                            <span className="font-size-12 text-dark">
                              <Quantity
                                productId={product.id}
                                quantity={product.quantity}
                              />
                            </span>
                          </div>
                          <div className="font-weight-500 product-price">
                            <Price amount={product.price * product.quantity} currency='TRY' locale='tr-TR' className='font-size-14 text-primary font-weight-300' />
                          </div>
                        </div>
                      </div>

                    ))}
                  </div>
                  <div className="basket-dropdown-buttons">
                    <div className="d-flex align-items-center gap-2">
                    <span className="font-weight-600 font-size-16">Total Price:  </span><Price amount={totalPrice} currency='TRY' locale='tr-TR' className='font-size-16 text-primary font-weight-500' />

                    </div>

                    <Button
                      className="btn btn-primary"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        "Checkout"
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-dark font-weight-500">Your cart is empty.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}


export default TopbarRightBasket