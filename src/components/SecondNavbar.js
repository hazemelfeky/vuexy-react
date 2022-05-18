import './SecondNavbar.modules.scss'
import { BiHomeAlt } from 'react-icons/bi';
import { AiOutlineRight } from 'react-icons/ai';


export default function SecondNavbar(){
  return (
    <div className='second--nav'>
      <div className='second--nav__left'>
        <h3>Shop</h3>
      </div>
      <div className='second--nav__right'>
        <a href='#'><BiHomeAlt size='16px' /></a>
        <AiOutlineRight className="drawer--link__arrow" />
        <a href='#'>ECommerce</a>
        <AiOutlineRight className="drawer--link__arrow" />
        <p>Shop</p>
      </div>
    </div>
  )
}