import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import './Products.modules.scss'
import productsData from '../data/data'
import ProductGrid from './sub-combonents/ProductGrid';
import PriceRange from './sub-combonents/PriceRange';
import Ordering from './sub-combonents/Ordering';
import StarIcon from './sub-combonents/StarIcon';
import ProductList from './sub-combonents/ProductRow';
// import ProductsList from './sub-combonents/ProductsList';


// consts for filters
const ranges = [
  { title: 'All', down: 0, up:1000000, name: 'all'},
  { title: '<= $10', down: 0, up:10, name: '10'},
  { title: '$10 - $100', down: 10, up:100, name: '100'},
  { title: '$100 - $500', down: 100, up:500, name: '500'},
  { title: '>= $500', down: 500, up:1000000, name: 'more'},
]

const categories = [ 'Appliances', 'Audio', 'Cameras & Camcorders', 'Car Electronics & GPS', 'Cell Phones',
                    'Computers & Tablets', 'Health, Fitness & Beauty', 'Office & School Supplies', 'TV & Home Theater',
                    'Video Games']

const brands = [ 'All', 'Insignia™', 'Samsung', 'Metra', 'HP', 'Apple', 'GE', 'Sony', 'Incipo', 'KitchenAid', 'whirlpool']

const ratings = [ 4, 3, 2, 1]

export default function Products({ useFilters, showingFilters, handleAddToCart }){

  const [rangeState, setRangeState] = useState({down: 0, up:1000000})
  const [categoryState, setCategoryState] = useState(null)
  const [ratingState, setRatingState] = useState(null)
  const [brandsState, setBrandsState] = useState('All')
  const [search, setSearch] = useState('')
  const [products, setProducts ] = useState(productsData.products)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [order, setOrder ] = useState('Featured')
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [numberOfPages, setNumberOfPages] = useState(3)
  const [shownProducts, setShownProducts] = useState([])
  const [productGrid, setProductGrid] = useState(true)

  const handlePaginationLeft = () => {
    if( currentPage != 0){
      setCurrentPage(currentPage-1);
    }
  }

  const handlePaginationRight = () => {
    if( currentPage != numberOfPages){
      setCurrentPage(currentPage+1);
    }
  }

  const handleChoosePagination = (page) => {
    setCurrentPage(page)
  }

  // pagination and viewing 
  useEffect( () => {
    const indexOfLastItem = (currentPage+1) * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    setShownProducts( selectedProducts.slice( indexOfFirstItem, indexOfLastItem ) )
    setNumberOfPages( Math.round( selectedProducts.length / itemsPerPage ) )
  }, [currentPage, selectedProducts])


  //sorting
  useEffect( () => {
    if( order == 'Featured'){ // sorting at what
      setShownProducts( shownProducts.sort( (a,b) => a.id > b.id ? 1 : -1 ))
    }else if(order == 'Lowest'){
      setShownProducts( shownProducts.sort( (a,b) => a.price > b.price ? 1 : -1 ))
    }else if(order == 'Highest'){
      setShownProducts( shownProducts.sort( (a,b) => a.price < b.price ? 1 : -1 ))
    }
  }, [order])

  //filtering
  useEffect(() => {
    setSelectedProducts(
      products.filter( product => search === ''? product : product.name.toLowerCase().includes(search.toLowerCase().trim()) )
        .filter( product => brandsState == 'All'? product: product.brand == brandsState.toLowerCase() )
        .filter( product => ratingState == null? product: product.rating == ratingState || product.rating > ratingState )
        .filter( product => product.price < rangeState.up && product.price > rangeState.down )
        .filter( product => product.available )
    )

    // pagination
    setCurrentPage(0)
    setShownProducts( selectedProducts )
  }, [rangeState, categoryState, brandsState, search, ratingState])

  return (
    <div className='products'>
      <div className={`products__left ${showingFilters && 'show'}`}>
        <h2>Filters</h2>
        <div className='products__left__card comp'>
          <div className="products__left__card__filter">
            <h2>Multi Range</h2>
            {ranges.map( range => (
              <div key={range.name} className='radio'>
                <input type="radio" id={range.name} name="range" value={range.name} onChange={ e => setRangeState({ down: range.down, up: range.up}) } />
                <label htmlFor={range.name}>{range.title}</label>
              </div>
            ))}
          </div>

          <PriceRange />

          <div className="products__left__card__filter">
            <h2>Categories</h2>
            {categories.map( category => (
              <div key={category} className='radio'>
                <input type="radio" id={category} name="categories" value={category} onChange={ e => setCategoryState(e.target.value) }/>
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>

          <div className="products__left__card__filter">
            <h2>Brands</h2>
            {brands.map( brand => (
              <div key={brand} className='radio'>
                <input type="radio" id={brand} name="brands" value={brand} onChange={ e => setBrandsState(e.target.value) }/>
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}
          </div>

          <div className="products__left__card__filter">
            <h2>Ratings</h2>
            {ratings.map( rating => (
              <div key={rating} className='stars'>
                <input hidden type="radio" id={rating} name="ratings" value={rating} onChange={ e => setRatingState(rating) } />
                <label htmlFor={rating}>
                  {[...Array(5)].map((e, i) => i<rating ?
                    <StarIcon key={i} fill /> 
                    : <StarIcon key={i} stroke />)}
                  <span>&up</span>
                </label>
                <div className='stars__count'>{products.filter( product => product.rating == rating || product.rating > rating ).length}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className='products__right'>
        <div className='products__right__header'>
          <div className='products__right__header__left'>
            <h2>{selectedProducts.length || 'No'} results found</h2>
            <a href='#' onClick={ useFilters } className='burger--menu--filter'><svg xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>
          </div>
          <div className='products__right__header__right'>
            <Ordering selectedOder={order} setSelectedOrder={setOrder} />
            <div className='products__right__header__right__style'>
              <div className={`${productGrid? "active" : ""}`} onClick={() => setProductGrid(true)}>
                <svg data-v-15eba8c6="" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect data-v-15eba8c6="" x="3" y="3" width="7" height="7"></rect><rect data-v-15eba8c6="" x="14" y="3" width="7" height="7"></rect><rect data-v-15eba8c6="" x="14" y="14" width="7" height="7"></rect><rect data-v-15eba8c6="" x="3" y="14" width="7" height="7"></rect></svg>
              </div>
              <div className={`${!productGrid? "active" : ""}`} onClick={() => setProductGrid(false)}>
                <svg data-v-15eba8c6="" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line data-v-15eba8c6="" x1="8" y1="6" x2="21" y2="6"></line><line data-v-15eba8c6="" x1="8" y1="12" x2="21" y2="12"></line><line data-v-15eba8c6="" x1="8" y1="18" x2="21" y2="18"></line><line data-v-15eba8c6="" x1="3" y1="6" x2="3.01" y2="6"></line><line data-v-15eba8c6="" x1="3" y1="12" x2="3.01" y2="12"></line><line data-v-15eba8c6="" x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            </div>
          </div>
        </div>
        <div className='products__right__search comp'>
          <input value={search} onChange={ e => setSearch(e.target.value)} placeholder='Search...' className='products__right__search__input' />
          <FiSearch />
        </div>
        {/* <ProductsList selectedProducts={selectedProducts} /> tring add pages feature to products*/} 
        { productGrid? 
          <div className='products__right__grid'>
            {shownProducts
              .map( product => <ProductGrid handleAddToCart={handleAddToCart} key={product.id} product={product} />)}
          </div>
          : <div className='products__right__list'>
              {shownProducts
              .map( product => <ProductList handleAddToCart={handleAddToCart} key={product.id} product={product} />)}
            </div>
        }
          
        <div className='products__right__pagination'>
          <button disabled={ currentPage == 0 } className='products__right__pagination__left' onClick={handlePaginationLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div className='products__right__pagination__list'>
            {[...Array(numberOfPages || 1 )].map((e, i) => <button key={i} onClick={() => handleChoosePagination(i) } className={ i == currentPage ? "active" : ""}>{i + 1}</button>)}
          </div>
          <button disabled={ currentPage >= numberOfPages-1 } className='products__right__pagination__right' onClick={handlePaginationRight}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  )
}