import ReactDOM from "react-dom";
import React, {useContext, useEffect} from "react";

import './error.css'
import ErrorContext from "../../Context/ErrorContext";

export default () => {
    const {error, setError} = useContext(ErrorContext);

    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 2000);
    }, [error]);
    return ReactDOM.createPortal(
        <div id={'error_message'}>{error}</div>,
        document.querySelector('#error')
    );
}
