import React, { Fragment, useEffect, useRef, useState } from 'react';

import { TextEditOutput, TextOutput } from './Styles';

// To eliminate warning...

console.error = (function() {
	let error = console.error;

	return function(exception) {
		if (
			(exception + '').indexOf(
				'Warning: A component is `contentEditable`',
			) !== 0
		) {
			error.apply(console, arguments);
		}
	};
})();

const TextEditWindowOutput = ({ editable, state, setState }) => {
	const editOutput = useRef();
	const showOutput = useRef();
	const [editing, setEditing] = useState(false);

	const handleFocus = (e) => {
		if (
			!editOutput.current?.contains(e.target) &&
			!showOutput.current?.contains(e.target)
		) {
			setEditing(false);
		} else if (showOutput.current?.contains(e.target)) {
			setEditing(true);
			editOutput.current.focus();
		}
	};

	const enableTab = (e) => {
		if (e.keyCode === 9) {
			// tab was pressed
			e.preventDefault();
			// get caret position/selection
			let val = editOutput.current.value,
				start = editOutput.current.selectionStart,
				end = editOutput.current.selectionEnd;
			console.log(val, start, end);
			// set textarea value to: text before caret + tab + text after caret
			editOutput.current.value =
				val.substring(0, start) + '\t' + val.substring(end);

			// put caret at right position again
			editOutput.current.selectionStart = editOutput.current.selectionEnd =
				start + 1;

			// prevent the focus lose
			return false;
		}
	};

	const handleChange = (e) => {
		let input = e.target.value;
		setState(input);
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
				onKeyDown={(e) => enableTab(e)}
				onChange={(e) => handleChange(e)}
			/>
		</Fragment>
	);
};

export default TextEditWindowOutput;
