import './ProductRow.modules.scss'
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import StarIcon from './StarIcon';

export default function ProductRow({product, handleAddToCart}){
  return (
    <div className='product--row comp'>
      <div className='product--row__left'>
        <img alt='product' src={product.img} />
      </div>
      <div className='product--row__center'>
        <h3 className='product--row__center__name'>{product.name}</h3>
        <h5 className='product--row__center__company'>by <span>{product.brand}</span></h5>
        <div className='product--row__center__stars'>
          {[...Array(5)].map((e, i) => i<product.rating ?
            <StarIcon key={i} fill /> 
            : <StarIcon key={i} stroke />)}
        </div>
        <p className='product--row__center__description'>{product.discription}</p>
      </div>
      <div className='product--row__right'>
        <div className='product--row__right__price'>${product.price}</div>
        <div className='product--row__right__up'><AiOutlineHeart /><h4>Wishlist</h4></div>
        <div onClick={ () => handleAddToCart(product)} className='product--row__right__down'><FiShoppingCart /><h4>Add In Cart</h4></div>
      </div>
    </div>
  )
}