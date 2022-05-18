import './Navbar.modules.scss'
import { BsCheck2Square, BsMoon } from 'react-icons/bs';
import { MdChatBubbleOutline } from 'react-icons/md';
import { AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai';
import { FiSearch, FiShoppingCart, FiBell } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import CartItem from './sub-combonents/CartItem';


export default function Navbar({ useDrawer, useDark, isDark, cartProducts, handleDeleteFromCart }){
  const [ showCart, setShowCart] = useState(false)
  const wrapperRef = useRef(null);
  const [totalCost , setTotalCost] = useState(false)
  useEffect( () => {
    let temp = cartProducts.reduce((a, b) => a + b.price, 0);
    setTotalCost(temp)
  }, [cartProducts])
  // console.log(totalCost);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) ) {
        setShowCart(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className='navbar comp'>
      <div className='navbar__left'>
        <a href='#' onClick={ useDrawer } className='burger--menu'><svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>
        <a href='#'><AiOutlineCalendar /></a>
        <a href='#'><MdChatBubbleOutline /></a>
        <a href='#'><AiOutlineMail /></a>
        <a href='#'><BsCheck2Square /></a>
      </div>
      <div className='navbar__right'>
        <a href='#' onClick={ useDark }>
          { !isDark?
            <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          }
        </a>
        <a href='#'><FiSearch /></a>
        <a href='#' onClick={ () => !showCart && setShowCart(true) }>
          <FiShoppingCart />
          { cartProducts != 0 && <div className='badge'>{cartProducts.length}</div>}
        </a>
        <a href='#'><FiBell /></a>
        <a href='#' className='navbar__right__profile'>
          <div className='navbar__right__profile__name'>
            <h4>John Doe</h4>
            <p>admin</p>
          </div>
          <div className='navbar__right__profile__photo'>
            <img src='/images/pizza.jpg' />
            <span className='online'></span>
          </div>
        </a>
      </div>
      <div ref={wrapperRef} className={`cart comp ${showCart? 'show' : ''}`} >
        <div className='cart__title'>
          <h2>My Cart</h2>
          <div className='cart__title__count'>{cartProducts.length} items</div>
        </div>
        { cartProducts.length ? 
          <div>
            <div className='cart__items'>
              {cartProducts.map( prod => <CartItem key={prod.id} handleDeleteFromCart={handleDeleteFromCart} product={prod}/>)}
            </div>
            <div className='cart__total'>
              <div className='cart__total__top'>
                <h4>Total</h4>
                <h4 className='cart__total__top__money'>${totalCost}</h4>
              </div>
              <div className='cart__total__bot'>
                Checkout
              </div>
            </div>
          </div> : 
          <div className='cart__empty'>Your cart is empty</div>
        }
      </div>
    </div>
  )
}