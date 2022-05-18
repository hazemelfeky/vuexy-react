import React, {useState} from 'react';
import {AiOutlineArrowUp} from 'react-icons/ai';
import './ScrollButton.modules.scss';


const ScrollButton = () =>{

	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300){
		setVisible(true)
		}
		else if (scrolled <= 300){
		setVisible(false)
		}
	};

	const scrollToTop = () =>{
		window.scrollTo({
		top: 0,
		behavior: 'smooth'
		/* you can also use 'auto' behaviour
			in place of 'smooth' */
		});
	};

	window.addEventListener('scroll', toggleVisible);

	return (
		<div onClick={scrollToTop} className='scroll' style={{display: visible ? 'flex' : 'none'}}>
			<AiOutlineArrowUp />
		</div>
	);
}

export default ScrollButton;
