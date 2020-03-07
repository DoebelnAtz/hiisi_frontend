import React, { Fragment, useEffect, useRef, useState } from 'react';

import { TextEditOutput, TextOutput } from './Styles';

// To eliminate warning...

console.error = (function() {
	let error = console.error;

	return function(exception: any) {
		if (
			(exception + '').indexOf(
				'Warning: A component is `contentEditable`',
			) !== 0
		) {
			// @ts-ignore
			error.apply(console, arguments);
		}
	};
})();

type TextEditWindowOutputProps = {
	editable: boolean;
	state: string;
	setState: any;
};

const TextEditWindowOutput: React.FC<TextEditWindowOutputProps> = ({
	editable,
	state,
	setState,
}) => {
	const editOutput = useRef<HTMLTextAreaElement>(null);
	const showOutput = useRef<HTMLDivElement>(null);
	const [editing, setEditing] = useState(false);

	const handleFocus = (e: any) => {
		if (
			!editOutput.current?.contains(e.target) &&
			!showOutput.current?.contains(e.target)
		) {
			setEditing(false);
		} else if (showOutput.current?.contains(e.target)) {
			setEditing(true);
			editOutput.current?.focus();
		}
	};

	const enableTab = (e: React.KeyboardEvent) => {
		if (e.keyCode === 9 && editOutput.current) {
			// tab was pressed
			e.preventDefault();
			// get caret position/selection
			let val = editOutput.current?.value,
				start = editOutput.current?.selectionStart,
				end = editOutput.current?.selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			editOutput.current.value =
				val.substring(0, start) + '\t' + val.substring(end);

			// put caret at right position again
			editOutput.current.selectionStart = editOutput.current.selectionEnd =
				start + 1;

			// prevent the focus lose
			return false;
		} else {

			if (e.keyCode === 191 && state.slice(-1) === '<') {
				// TODO: autoclose bracket here.
			}
		}
	};

	const handleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setState(target.value);
	};

	useEffect(() => {
		document.addEventListener('click', handleFocus);

		return () => {
			document.removeEventListener('click', handleFocus);
		};
	}, []);

	// If user clicks inside the div show the textarea, else show the div with injected html
	return (
		<Fragment>
			<TextOutput
				style={{ display: !editing || !editable ? 'block' : 'none' }}
				ref={showOutput}
				dangerouslySetInnerHTML={{ __html: state }}
			/>
			<TextEditOutput
				id={'texteditor'}
				style={{ display: editing && editable ? 'block' : 'none' }}
				ref={editOutput}
				value={state}
				onKeyDown={(e: React.KeyboardEvent) => enableTab(e)}
				onChange={(e: React.KeyboardEvent) => handleChange(e)}
			/>
		</Fragment>
	);
};

export default TextEditWindowOutput;
