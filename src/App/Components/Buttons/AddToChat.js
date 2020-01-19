import {useSpring, animated} from 'react-spring'
import React, { useState } from 'react';

const AddToChat = (props) => {
    const [expanded, setExpanded] = useState(false);
    const expand = useSpring({width: expanded ? '150px': '0px', opacity: expanded ? 1 : 0});
    const search = useSpring({width: props.searchResults.username ? '150px': '0px', opacity: props.searchResults.username ? 1 : 0});

    return (
        <div className={'row ml-0 my-2'}>
            <button onClick={() => setExpanded(!expanded)}>
                {expanded ? 'x' : '+'}
            </button>
            <animated.div style={expand}>
                <input style={{width: 'inherit', position: 'relative'}}
                    onKeyDown={props.onKeyDown}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />
            </animated.div>
            <animated.div style={search}>
                <span style={{backgroundColor: (props.searchResults.username ? 'lightgreen': 'white')}} className={'ml-2 add_user_result'}>{props.searchResults ? props.searchResults.username  : ''}</span>
            </animated.div>
        </div>
        )
};

export default AddToChat