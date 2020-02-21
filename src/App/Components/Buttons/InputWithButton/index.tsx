import React, { Fragment, ReactNode } from 'react';
import { InputSection, ButtonSection, InputButtonDiv } from './Styles';

type InputProps = {
	children?: ReactNode;
	placeholder?: string;
	onClick?: any;
	onChange?: any;
	value?: string;
};

const InputButton: React.FC<InputProps> = ({
	children,
	placeholder,
	onChange,
	onClick,
	value,
}) => {
	return (
		<InputButtonDiv>
			<InputSection
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			<ButtonSection onClick={onClick}>{children}</ButtonSection>
		</InputButtonDiv>
	);
};

export default InputButton;
