import React from 'react';
import tachyons from 'tachyons';
import Tilt from 'react-tilt';
import logo from './logo.jpg'
const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-4" options={{ max : 20 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner">
 					<img src={logo} amlt='logo' />
 				</div>
			</Tilt>
		</div>
	)
}
export default Logo;