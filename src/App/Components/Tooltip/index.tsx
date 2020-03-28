import React from 'react';
import { TooltipDiv } from './Styles';

const Tooltip: React.FC = ({ children }) => {
	return (
		<TooltipDiv className={'tooltip'}>
			<div>
				<span>{children}</span>
			</div>
		</TooltipDiv>
	);
};

export default Tooltip;
