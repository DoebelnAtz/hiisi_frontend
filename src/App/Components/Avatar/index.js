import React from 'react'

import { Avatar } from './Styles'

const ComponentAvatar = (props) => {
    return (
        <Avatar key={props.key} src={props.src} size={props.size} borderSize={props.borderSize} borderColor={props.borderColor}/>
    )
};

export default ComponentAvatar;