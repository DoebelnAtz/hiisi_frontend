import React from 'react';

import { TextEditor } from './Styles';

import TextOutput from './TextOutput';

type TextEditWindowProps = {
	editable: boolean;
	state: string;
	setState: any;
	error?: boolean
};

const TextEditWindow: React.FC<TextEditWindowProps> = ({
	editable,
	state,
	setState,
	error=false
}) => {
	return (
		<TextEditor error={error}>
			<TextOutput editable={editable} state={state} setState={setState} />
		</TextEditor>
	);
};

export default TextEditWindow;
