const StarIcon = ({fill, stroke}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill={fill? '#FF9F43' : "none"} stroke={stroke ? "#b9b9c3": "none"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill-current text-warning"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
}

export default StarIcon