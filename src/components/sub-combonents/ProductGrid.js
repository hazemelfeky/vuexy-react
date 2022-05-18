import './ProductGrid.modules.scss'
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import StarIcon from './StarIcon';



export default function Product({product, handleAddToCart}){

  return (
    <div className='product comp'>
      <div className='product__image'>
        <img alt='product' src={product.img} />
      </div>
      <div className='product__details'>
        <div className='product__details__numbers'>
          <div className='product__details__numbers__stars'>
            {/* {product.rating}  */}
            {[...Array(5)].map((e, i) => i<product.rating ?
              <StarIcon key={i} fill /> 
              : <StarIcon key={i} stroke />)}
          </div>
          <div className='product__details__numbers__price'>
            ${product.price} 
          </div>
        </div>
        <h3 className='product__details__name'>{product.name}</h3>
        <p className='product__details__discription'>{product.discription}</p>
      </div>
      <div className='product__btns'>
        <div className='product__btns__up'><AiOutlineHeart /><h4>Wishlist</h4></div>
        <div onClick={ () => handleAddToCart(product)} className='product__btns__down'><FiShoppingCart /><h4>Add In Cart</h4></div>
      </div>
    </div>
  )
}
