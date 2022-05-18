import { useEffect, useRef, useState } from 'react'
import './Ordering.modules.scss'
import { AiOutlineDown } from 'react-icons/ai';


const orders = ['Featured', 'Lowest', 'Highest']

export default function Ordering({ selectedOder, setSelectedOrder}){
  const [showOrder, setShowOrder ] = useState(false)
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOrder(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClickOrder = (ord) => {
    setSelectedOrder(ord)
    setShowOrder(false)
  }

  return (
    <div ref={wrapperRef} className={`selector ${showOrder? "active" : ""}`}>
      <div onClick={ () => setShowOrder(!showOrder) } className='selector__head'>
        <h3 className='selector__head__title'>
          {selectedOder}
        </h3>
        <AiOutlineDown />
      </div>
      <div className={`selector__choices ${showOrder? "show" : ""}`}>
        { orders.map( ord => (
          <div key={ord} className='selector__choices__choice' onClick={ () => handleClickOrder(ord)}>
            {ord}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
 function useOutsideAlerter(ref) {
  
}