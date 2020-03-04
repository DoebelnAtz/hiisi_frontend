import React, { useState } from 'react';

import { TextEditor } from './Styles';

import TextOutput from './TextOutput';

type TextEditWindowProps = {
	editable: boolean;
	state: string;
	setState: any;
};

const TextEditWindow: React.FC<TextEditWindowProps> = ({
	editable,
	state,
	setState,
}) => {
	return (
		<TextEditor>
			<TextOutput editable={editable} state={state} setState={setState} />
		</TextEditor>
	);
};

export default TextEditWindow;
