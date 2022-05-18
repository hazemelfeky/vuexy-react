import './ProductsList.modules.scss'
import Product from './Product';
import { useEffect, useState } from 'react';


export default function ProductsList({ selectedProducts }){
  const [ slicedProduscts, setSlicedProducts ] = useState([])
  const [ pageNumber, setPageNumber ] = useState(0)

  useEffect( () => {
    let temp = []
    const chunkSize = 10;
    for (let i = 0; i < selectedProducts.length; i += chunkSize) {
      const chunk = selectedProducts.slice(i*chunkSize, i*chunkSize + chunkSize-1);
      temp.splice(-1, 0, chunk)
    }
    setSlicedProducts(temp)
    console.log(temp);
  }, [pageNumber])

  // useEffect( () => {
    
  //   console.log(slicedProduscts);
  // }, [pageNumber])
  
  return (
    <div className=''>
      <div className='list'>
        {/* {slicedProduscts && slicedProduscts[pageNumber]
          .map( product => <Product key={product.id} product={product} />)
        } */}
      </div>
      <div className='navigator'>
        {/* { slicedProduscts.length.map( page => <div key={page} className='list__navigator__page'>{page + 1}</div>)} */}
      </div>
    </div>
  )
}