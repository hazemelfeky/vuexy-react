import DrawerLink from "./DrawerLink";
import './DrawerGroup.modules.scss'

export default function DrawerGroup({ groupName, links}){
  return (
    <div className="drawer--group">
      <h3>{groupName}</h3>
      {links.map( link => <DrawerLink key={link.name} link={link} />)}
    </div>
  )
}