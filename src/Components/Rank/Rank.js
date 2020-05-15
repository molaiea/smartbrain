import React from 'react';
import tachyons from 'tachyons';

const Rank = ({id}) => {
	return(
		<div >
			<div className='white f3'>
				{'Nafissa, your current rank is ...'}
			</div>
			<div className='f3'>
				{id}
			</div>
		</div>
	)
}
export default Rank;