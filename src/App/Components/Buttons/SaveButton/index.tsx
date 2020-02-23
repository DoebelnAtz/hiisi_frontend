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
	const [error, setError] = useState(false);

	const handleClick = async () => {
		try {
			let resp = await onClick();
			console.log(resp);
			setSaved(true);

			setTimeout(() => {
				setSaved(false);
			}, 1000);
		} catch (e) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 1000);
		}
	};
	return (
		<SaveButton saved={saved} error={error} onClick={() => handleClick()}>
			{children}
		</SaveButton>
	);
};

export default SaveButtonComponent;
