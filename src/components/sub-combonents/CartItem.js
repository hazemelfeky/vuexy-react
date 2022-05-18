import { useState } from 'react'
import './CartItem.modules.scss'

export default function CartItem({ product, handleDeleteFromCart }){
  const [count, setCount] = useState(1)
  const handleAdding = () => {
    let temp = count + 1 
    setCount(temp)
  }
  const handleDeleting = () => {
    let temp = count - 1 
    setCount(temp > 0 ? temp : 0)
  }

  return (
    <div className='item'>
      <img src={product.img} alt='cart item' />
      <div className='item__details'>
        <div className='item__details__name'>
          <div className='item__details__name__title'>{product.name}</div>
          <div className='item__details__name__brand'>By {product.brand}</div>
        </div>
        <div className='item__details__control'>
          <span onClick={ handleDeleting }>-</span>
          <span>{count}</span>
          <span onClick={ handleAdding }>+</span>
        </div>
        <div className='item__details__price'>${product.price}</div>
      </div>
      <div className='item__close' onClick={ () => handleDeleteFromCart(product)}>X</div>
    </div>
  )
}