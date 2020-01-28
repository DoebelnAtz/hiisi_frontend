import React from 'react';
import Input from "./Input";

const GroupedInput = ButtonComponent => props => {
    console.log(props);
    return class extends React.Component {
        render() {
            return (
                <div>
                    <Input/>
                    <ButtonComponent/>
                </div>
            )
        }

    }
};

export default GroupedInput