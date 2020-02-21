import {useSpring, animated, useChain} from 'react-spring'
import React, {useRef, useState} from 'react';
import Input from "../Input";
import {makeRequest} from "../../../Api/Api";
import Button from "./Button";

const AddToChat = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const inputRef = useRef();
    const btnRef = useRef();

    const inputOnExpand = useSpring({
        ref: inputRef,
        from: {
            width: '0px',// opacity: 0
        },
        to: {
                width: expanded ? '150px': '0px',
                opacity: expanded ? 1 : 0
        }
        });

    const search = useSpring(
        {
        width: searchResults.username ? '150px': '0px',
        opacity: searchResults.username ? 1 : 0,

        });

    const btnOnExpand = useSpring({
        ref: btnRef,
        from: {
            borderBottomRightRadius: '5px' ,
            borderTopRightRadius: '5px',
        },
        to: {
            borderBottomRightRadius: expanded ? '0' : '5px' ,
            borderTopRightRadius: expanded ? '0' : '5px' ,
        }
    });

    useChain(expanded ? [btnRef, inputRef] : [inputRef, btnRef], expanded ? [0, 0.15] : [0, 0.2]);

    const addUser = async (e) => {
        if (e.key === "Enter") {
            if (searchResults) {
                let resp = await makeRequest('messages/threads/add_user', 'post',
                    {
                        threadId: props.tid,
                        targetId: searchResults.u_id
                    });
                if (resp?.data)
                    setConnectedUsers([...connectedUsers, resp.data])
            }
            setSearchResults([]);
            setInputVal('')
        }
    };

    const handleSearchChange = async(e) => {
        setSearchResults([]);
        let val = e.target.value;

        if (val.length) {
            let resp = await makeRequest(
                `users/search?q=${val}`,
                'GET',
            );
            if (resp.data.length)
            {
                setSearchResults(resp.data[0])
            }
        }
    };

    return (
        <animated.div style={btnOnExpand} className={'row ml-0 my-2'}>
            <Button
                onClick={() => setExpanded(!expanded)}
                customStyle={
                    {
                        width: '24px',
                        borderBottomRightRadius:'inherit' ,
                        borderTopRightRadius: 'inherit' ,

                    }
                }
            >
                {expanded ? 'x' : '+'}
            </Button>
            <animated.div style={inputOnExpand}>
                <Input
                    customStyle={{
                        width: 'inherit', position: 'relative',
                        borderBottomLeftRadius: '0',
                        borderTopLeftRadius: '0',
                        borderLeft: '0'
                    }}
                    onEnter={addUser}
                    valueState={inputVal}
                    setValueState={setInputVal}
                    onChange={(e) => handleSearchChange(e)}
                    placeholder={'Add user'}
                />
            </animated.div>
            <animated.div style={search}>
                <span
                    style={
                    {
                        backgroundColor: (searchResults.username ? 'lightgreen': 'white')
                    }}
                    className={'ml-2 add_user_result'}
                >
                    {searchResults ? searchResults.username  : ''}
                    </span>
            </animated.div>
        </animated.div>
        )
};

export default AddToChat