import './Drawer.modules.scss'
import DrawerLink from './sub-combonents/DrawerLink'
import { BiHomeAlt, BiUser, BiText } from 'react-icons/bi';
import { AiOutlineDown, AiOutlineMail, AiOutlineCalendar, AiOutlineFileText, AiOutlineFile, AiOutlineEye, AiOutlinePlusCircle, AiOutlineLayout } from 'react-icons/ai';
import { BsChatLeft, BsCheck2Square } from 'react-icons/bs';
import { FiShoppingCart, FiDroplet, FiType } from 'react-icons/fi';
import { CgDesktop, CgComponents } from 'react-icons/cg';
import DrawerGroup from './sub-combonents/DrawerGroup';

export default function Drawer({ showDrawer, closeDrawer }){
  const groups = [
    { groupName: "APPS & PAGES", links: [
      {name: "Email", icon: AiOutlineMail},
      {name: "Chat", icon: BsChatLeft},
      {name: "Todo", icon: BsCheck2Square},
      {name: "Calendar", icon: AiOutlineCalendar},
      {name: "Invoice", icon: AiOutlineFileText, arrow: true},
      {name: "eCommerce", icon: FiShoppingCart, arrow: AiOutlineDown, active: true, subLinks: [
        {name: "Shop", superActive: true},
        {name: "Details"},
        {name: "Wishlist"},
        {name: "Checkout"},
      ]},
      
      {name: "User", icon: BiUser, arrow: true},
      {name: "Pages", icon: AiOutlineFile, arrow: true},
    ]},
    { groupName: "USER INTERFACE", links: [
      {name: "Typography", icon: FiType},
      {name: "Colors", icon: FiDroplet},
      {name: "Feather", icon: AiOutlineEye},
      {name: "Cards", icon: CgDesktop},
      {name: "Components", icon: CgComponents},
      {name: "Extensions", icon: AiOutlinePlusCircle},
      {name: "Page Layout", icon: AiOutlineLayout},
    ]},
    { groupName: "SECOND USER INTERFACE", links: [
      {name: "Typography", icon: BiText},
      {name: "Colors", icon: FiDroplet},
      {name: "Feather", icon: AiOutlineEye},
      {name: "Cards", icon: CgDesktop},
      {name: "Components", icon: CgComponents},
      {name: "Extensions", icon: AiOutlinePlusCircle},
      {name: "Page Layout", icon: AiOutlineLayout},
    ]}
  ]

  const dashboard = {icon: BiHomeAlt, name: 'Dashboards', arrow: true}

  return (
    <div className={`drawer comp ${showDrawer && 'show'}`}>
      <div className='drawer__logo'>
        <a href='#' className='drawer__logo__link'>
          <img src='/images/logo.36f34a9f.svg' alt='logo'/>
          <h1>Vuexy</h1>
        </a>
        <a onClick={ closeDrawer } className='drawer__logo__close' href='#'><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="d-block d-xl-none feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
      </div>

      <div className='drawer__links'>
        <DrawerLink link={dashboard} />
        {groups.map( group => <DrawerGroup key={group.groupName} groupName={group.groupName} links={group.links} />)}
      </div>
    </div>
  )
}