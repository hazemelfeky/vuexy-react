import './DrawerLink.modules.scss'
import { BsCircle } from 'react-icons/bs';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import { useState } from 'react';


export default function DrawerLink({link}){
  const [open, setOpen] = useState(false)
  const Icon = link.icon;
  const isCircle = link.icon.name == "BsCircle";   // handle circle size :D
  const hasSubLinks = link.subLinks != undefined

  const handleExpand = () => {
    setOpen(!open)
  }

  return (
    <div onClick={ link.arrow && handleExpand }>
      <div className={`drawer--link ${!!link.active? 'active' : ''} ${!!link.superActive? 'super--active' : ''}`}>
        <div className='drawer--link__container'>
          <a href="#">
            <Icon className={`drawer--link__icon ${isCircle && 'circle'}`} />
            <p>{link.name}</p>
          </a>
        </div>
        {link.arrow && 
          ( open ? <AiOutlineDown className="drawer--link__arrow" /> 
          : <AiOutlineRight className="drawer--link__arrow" />)
        }
      </div>
      <div className={`drawer--sublinks__container ${open? 'open': ''}`}>
        { hasSubLinks && link.subLinks.map( sublink => (
          <DrawerLink key={sublink.name} link={{ ...sublink, icon: BsCircle }} />
        ))}
      </div>
    </div>
  )
}