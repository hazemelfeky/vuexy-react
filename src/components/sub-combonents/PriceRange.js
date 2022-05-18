import { useEffect, useRef, useState } from 'react';
import './PriceRange.modules.scss'

export default function PriceRange(){

  const inputLeft = useRef(null);
  const inputRight = useRef(null);
  const thumbLeft = useRef(null);
  const thumbRight = useRef(null);
  const range = useRef(null);
  const [left, setLeft] = useState(10)
  const [right, setRight] = useState(90)


  const setLeftValue = () => {
    const min = inputLeft.current.min;
    const max = inputLeft.current.max;

    setLeft( Math.min(left, right - 1) )

    const percent = ((left - min) / (max - min)) * 100;

    thumbLeft.current.style.left = left + "%";
    range.current.style.left = left + "%";
  }

  useEffect(() => {
    setLeftValue();
  }, [left])

  const setRightValue = () => {
    const min = parseInt(inputRight.current.min);
    const max = parseInt(inputRight.current.max);

      setRight( Math.max( right, left + 1 ) )

    const percent = ((right - min) / (max - min)) * 100;

    thumbRight.current.style.right = (100 - right) + "%";
    range.current.style.right = (100 - right) + "%";
  }

  useEffect(() => {
    setRightValue();
  }, [right])

  return (
    <div className='price--range'>
      <h2>Price Range</h2>
      <div className="middle">
        <div className="multi-range-slider">
          <input type="range" onChange={ e => setLeft(e.target.value) } ref={inputLeft} min="0" max="100" value={left} />
          <input type="range" onChange={ e => setRight(e.target.value) } ref={inputRight} min="0" max="100" value={right} />

          <div className="slider">
            <div className="track"></div>
            <div ref={range} className="range"></div>
            <div ref={thumbLeft} className="thumb left"></div>
            <div ref={thumbRight} className="thumb right"></div>
          </div>
        </div>
      </div>
    </div>
  )
}