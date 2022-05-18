import { useState } from "react";
import Drawer from "./Drawer";
import './Layout.modules.scss'
import Navbar from "./Navbar";
import Products from "./Products";
import ScrollButton from "./ScrollButton";
import SecondNavbar from "./SecondNavbar";

export default function Layout({}){
  const [dark, setDark] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [cartProducts, setCartProducts] = useState([])

  const handleAddToCart = (prod) => {
    const isAlreadyInCart = cartProducts.includes(prod)
    if (!isAlreadyInCart) {
      setCartProducts([ ...cartProducts, prod])
    }
  }

  const handleDeleteFromCart = (prod) => {
    setCartProducts( cartProducts.filter( (x) => x.id != prod.id ))
  }

  return (
    <div className={`app ${dark? "dark" : ""}`}>
      <div onClick={ () => {
        setShowDrawer(false)
        setShowFilters(false)
        }} 
        className={`overlay ${showDrawer || showFilters ? 'show': ''}`}
      ></div>
      <Drawer closeDrawer={ () => setShowDrawer(false) } showDrawer={showDrawer} />
      <div className="app__main--content container">
        <Navbar handleDeleteFromCart={handleDeleteFromCart} cartProducts={cartProducts} isDark={dark} useDrawer={ () => setShowDrawer(!showDrawer) } useDark={ () => setDark(!dark) }/>
        <div className="app__main--content__down">
          <SecondNavbar />
          <Products handleAddToCart={handleAddToCart} useFilters={ () => setShowFilters(!showFilters) } showingFilters={showFilters} />
        </div>
      </div>
      <ScrollButton />
    </div>
  )
}