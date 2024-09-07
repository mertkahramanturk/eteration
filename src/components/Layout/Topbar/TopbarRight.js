import React from 'react'
import TopbarRightBasket from './TopbarMiniCart'

function TopbarRight() {
  return (
    <React.Fragment>
      <div className='gap-4 d-flex align-items-center'>
        <div className='d-flex align-items-center gap-2'>
        <i className='fas fa-user text-white' />
        <span className='text-white font-weight-300'>Mert</span>
        </div>
      <TopbarRightBasket />
      </div>
   
    </React.Fragment>
  )
}

export default TopbarRight