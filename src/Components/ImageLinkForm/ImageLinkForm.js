import React from 'react';
import tachyons from 'tachyons';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return(
		<div >
			<p className='f3'>
				{'This Magic Brain will detect faces in yout pictures! Give it a try!'}
			</p>
			<div className='center'>
			<div className='form center pa4 br3 shadow-5'>
				<input type='tex' onChange={onInputChange} className='f4 pa2 w-70 center' placeholder='blablaba'/>
				<button onClick={onSubmit} className='w-30 grow f4 link ph3 pv3 dib white bg-light-purple br15 pointer'>Detect</button>
			</div>
			</div>
		</div>
	)
}
export default ImageLinkForm;