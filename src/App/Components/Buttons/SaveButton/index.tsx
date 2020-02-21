import React, { useState } from 'react';
import { SaveButton } from './Styles';

type SaveButtonComponentProps = {
	onClick: () => Promise<boolean>;
};

const SaveButtonComponent: React.FC<SaveButtonComponentProps> = ({
	children,
	onClick,
}) => {
	const [saved, setSaved] = useState(false);

	const handleClick = async () => {
		setSaved(true);
		try {
			let resp = await onClick();
			console.log(resp);
			setTimeout(() => {
				setSaved(false);
			}, 1000);
		} catch (e) {
			setSaved(false);
		}
	};
	return (
		<SaveButton saved={saved} onClick={() => handleClick()}>
			{children}
		</SaveButton>
	);
};

export default SaveButtonComponent;
