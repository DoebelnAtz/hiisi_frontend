import React, { useEffect, useState } from 'react';
import { SaveButton } from './Styles';
import LoadingDots from '../../Loading';
import { color } from '../../../../Styles/SharedStyles';
import { useMounted } from '../../../../Hooks';

type SaveButtonComponentProps = {
	onClick: () => Promise<boolean>;
};

const SaveButtonComponent: React.FC<SaveButtonComponentProps> = ({
	children,
	onClick,
}) => {
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const isMounted = useMounted();

	const handleClick = async () => {
		isMounted && setIsSaving(true);
		try {
			await onClick();
			if (isMounted.current) {
				setSaved(true);
				setIsSaving(false);
			}
			setTimeout(() => {
				isMounted.current && setSaved(false);
			}, 500);
		} catch (e) {
			if (isMounted.current) {
				setIsSaving(false);
				setError(true);
			}
			setTimeout(() => {
				isMounted.current && setError(false);
			}, 500);
		}
	};

	return (
		<SaveButton saved={saved} error={error} onClick={() => handleClick()}>
			{isSaving ? (
				<LoadingDots
					height={13}
					color={color.siteBG2}
					cycleSpeed={200}
				/>
			) : (
				children
			)}
		</SaveButton>
	);
};

export default SaveButtonComponent;
