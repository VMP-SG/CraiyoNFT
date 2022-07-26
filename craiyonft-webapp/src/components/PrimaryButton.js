import React from 'react';

const PrimaryButton = ({ text, tw }) => {
	return (
		<button className={`box-border hover:border h-[29.33px] w-[88.27px] flex items-center justify-center rounded-[15.43px] text-blue-dark bg-primary text-[11.33px] leading-[15.48px] font-medium ${tw}`}>
			{ text }
		</button>
	);
}

export default PrimaryButton;
