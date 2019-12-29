import React from 'react'
import { useSpring, animated } from 'react-spring'


export const ToggleButton = (props) => {

    const config = { mass: 5, tension: 500, friction: 10, clamp: true};


    const handleClick = () => {
        if (!props.connected) {
            window.location.replace('https://api.intra.42.fr/oauth/authorize?client_id=520cf2ed25a517e352458db17ec06a2f0791b65cf99fc851ef0dea579908f158&scope=public%20projects%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000/redirect&response_type=code')
        props.setConnected(!props.connected) // separate func for customization if needed
        }
    };

    const toggle = useSpring({transform: !props.connected ? 'translateX(20px)' : "translateX(0px)"}, config);

    return (
        <div className={'toggle_background'}>
            <animated.div onClick={handleClick} style={toggle} className={'toggle_button'}>
                 <span className={'pl-3 noselect pr-3'}>42</span>
            </animated.div>
        </div>
    );
};
