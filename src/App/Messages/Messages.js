import React, {useEffect, useRef, useState} from 'react';
import { withRouter } from "react-router-dom";

import { useParams } from "react-router-dom";
import _ from 'lodash'
import useSocket from 'use-socket.io-client';

import { useNav } from "../../Hooks/Hooks";
import Button from "../Components/Buttons/Button";
import { makeRequest } from "../Api/Api";
import './messages.css'
import { calculateTimeSince, getLocal } from "../../utils/utils";

import socketIOClient from "socket.io-client";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import AddToChat from "../Components/Buttons/AddToChat";

const Messages = (props) => {

    const [inputVal, setInputVal] = useState('');
    const [addUserInputVal, setAddUserInputVal] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const [socket, setSocket] = useState();

    let scrollDown = useRef(null);
    let tid = props.match.params.tid ?? props.tid;

    useNav('messages');
    useEffect(() => {
        let socket = socketIOClient('http://localhost:5010', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            "Authorization": "Bearer " + getLocal('token').token
                        }
                    }

                }
            }, props.match.params.tid
        );
        socket.on('connect', () => {
            setConnected(true);
        });
        socket.on('joined-room', (user) => {
            setActiveUsers([...activeUsers, user.username]);
        });
        socket.on('left-room', (user) => {
            console.log('left-room' + user.username)
        });
        socket.on('chat-message', (message) => {
            console.log('incoming message');
            setNewMessage(message);
        });
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, [props.match.params.tid]);

    useEffect(() => {
        if (newMessage.username)
            appendMessage(newMessage)
        }, [JSON.stringify(newMessage)]);

    useEffect(() => {
        console.log(tid);
        getMessages(tid);
        getUsersConnected(tid);

    }, [props.match.params.tid]);

    // useEffect(() => {
    //     connectToRoom();
    // }, [socket?.connected]);


    const scrollToBottom = () => {
        scrollDown.current.scrollIntoView({ behavior: "smooth"})
    };

    const appendMessage = (message) => {
        setMessages([...messages, message]);
        setTimeout(() => scrollToBottom(), 10)
    };

    const getMessages = async (tid) => {
        let resp = await makeRequest('messages/threads/' + tid, 'GET',);
        setMessages(resp.data);
        console.log(messages);
        scrollDown.current.scrollIntoView()
    };


    const handleClick = async (event) => {
        event.preventDefault();
        if (inputVal.length) {
            socket.emit('send-message', {
                message: inputVal,
                username: getLocal('currentUser').username,
                time_sent: new Date().toISOString(),
                t_id: props.match.params.tid});
        }
        setInputVal('');
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleClick(event);
        }
    };

    const getUsersConnected = async (tid) => {
        let resp = await makeRequest('messages/threads/' + tid + '/users');
        if (resp.data) {
            setConnectedUsers(resp.data);
        }
    };

    const renderMessages = () => {
        if (messages.length) {
            return (
                messages.map((message) => {
                    return (
                        <div key={message.m_id}
                             className={(message.username === getLocal('currentUser').username) ? "sent" : "received"}>
                            <div className={'container-fluid'}>
                                <div className={'row message_info'}>
                                    <img className={'message_img'}
                                         src={"https://cdn.intra.42.fr/users/small_" + message.username + (message.username === 'marvin' ? ".png" : ".jpg")}/>
                                    <span className={'message_info_time'}>{calculateTimeSince(message.time_sent)}</span>
                                </div>
                                <div className={'row message_content'}>
                                    <span className={"message_text"}>{message.message}</span>
                                </div>
                            </div>
                        </div>
                    )
                })

            )
        }

    };
    const renderConnectedUsers = () => { // TODO: the status dot only shows the logged in user as active; fix
        return (
            connectedUsers.map((user) => {
                return (
                    <div key={user.u_id}>
                        <img

                            className={'message_img'}
                            src={"https://cdn.intra.42.fr/users/small_" + user.username  + ".jpg"}
                        />
                        <div
                            className={'connected_' +
                            ((user.username === getLocal('token').user.username || activeUsers.includes(user.username)) ? "active" : "inactive")
                            + '_dot'}>
                        </div>
                    </div>
                )
            })
        )
    };

    return (
        <div className={'message_cont container p-0'}>
            <div className={'row_div '}>{renderConnectedUsers()}</div>
            <div className={'row_div '}>
                <AddToChat tid={props.match.params.tid}/>
            </div>

            <div className={"message_feed"}>
                {renderMessages()}
                <div ref={e => scrollDown.current = e}> </div>
            </div>
            <div className={''}>
            <textarea id={'chat_input'} onKeyDown={(e) =>handleEnter(e)} value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}>
            </textarea>
                <button id={'send_button'} onClick={(e) => handleClick(e)}>{(connected ? 'send' : <CircularProgress size={20} />)}</button>
            </div>
        </div>

    )
};

// class Messages extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             messages: [],
//             connected: false,
//             inputVal: '',
//             addUserInputVal: '',
//             searchResults: {},
//             connectedUsers: [],
//             activeUsers: [],
//         };
//         this.scrollDown = React.createRef();
//     }
//
//     profile = JSON.parse(localStorage.getItem("currentUser"));
//     socket;
//     tid = this.props.match.params.tid;
//
//     componentDidMount() {
//         this.props.setCurrentNav('messages');
//
//         this.getMessages();
//         this.connectToRoom();
//         this.scrollToBottom();
//         this.getUsersConnected();
//     }
//
//     // React router doesn't remount component when new url param is given.
//     // So we need to check if we are given an updated url, we update the page.
//     componentWillReceiveProps(nextProps) {
//         console.log(nextProps.match.params.tid, this.tid);
//         if (nextProps.match.params.tid === this.tid) {
//             return;
//         } else {
//             this.tid = nextProps.match.params.tid;
//             this.socket.disconnect();
//             console.log('hot');
//             this.getMessages();
//             this.connectToRoom();
//             this.scrollToBottom();
//             this.getUsersConnected();
//         }
//     }
//
//     componentWillUnmount() {
//         this.socket.disconnect()
//     }
//
//     componentDidUpdate() {
//
//         this.scrollToBottom();
//     }
//
//     scrollToBottom = () => {
//         this.scrollDown.scrollIntoView({ behavior: "smooth"})
//     };
//
//     appendMessages = (message) => {
//         console.log(this.state.messages);
//         this.setState({messages: [...this.state.messages, message]});
//
//     };
//
//     getMessages = async () => {
//         let resp = await makeRequest('messages/threads/' + this.tid, 'GET',);
//         this.setState({messages: resp.data});
//         console.log(this.state.messages);
//     };
//
//
//     connectToRoom = () => {
//         this.socket = socketIOClient('http://localhost:5010', {
//             transportOptions: {
//                 polling: {
//                     extraHeaders: {
//                         "Authorization": "Bearer " + getLocal('token').token
//                     }
//                 }
//
//             }
//         });
//         console.log(this.state.messages);
//         try {
//             this.socket.on('connect', () => {
//                 this.setState({connected: true});
//             });
//             this.socket.on('joined-room', (user) => {
//                 this.setState({activeUsers: [...this.state.activeUsers, user.username]});
//             });
//             this.socket.on('left-room', (user) => {
//                 console.log('left-room' + user.username)
//             });
//             this.socket.on('chat-message', (message) => {
//                 console.log('incoming message');
//                 this.appendMessages(message);
//                 this.scrollDown.scrollIntoView({ behavior: "smooth"});
//             });
//         } catch (e) {
//             console.log('Socket ERROR: ' + e);
//         }
//     };
//
//     handleClick = async (event) => {
//         event.preventDefault();
//         if (this.socket && this.state.inputVal.length) {
//             var final_data = {
//                 'message': this.state.inputVal,
//             };
//             this.socket.emit('send-message', {
//                 message: this.state.inputVal,
//                 username: this.profile.username,
//                 time_sent: new Date().toISOString(),
//                 t_id: this.tid});
//         }
//         this.setState({ inputVal: ''});
//     };
//
//     handleEnter = (event) => {
//         if (event.key === "Enter") {
//             this.handleClick(event);
//         }
//     };
//
//
//
//
//
//     getUsersConnected = async () => {
//         let resp = await makeRequest('messages/threads/' + this.tid + '/users');
//         if (resp.data) {
//             this.setState({ connectedUsers: resp.data })
//         }
//     };
//
//     renderMessages = () => {
//         return (
//             this.state.messages.map((message) => {
//                 return (
//                     <div key={message.m_id} className={(message.username === this.profile.username) ? "sent" : "received"}>
//                         <div className={'container-fluid'}>
//                         <div className={'row message_info'}>
//                             <img className={'message_img'} src={"https://cdn.intra.42.fr/users/small_" + message.username + (message.username === 'marvin' ? ".png" : ".jpg")}/>
//                             <span className={'message_info_time'}>{calculateTimeSince(message.time_sent)}</span>
//                         </div>
//                         <div className={'row message_content'}>
//                             <span className={"message_text"}>{message.message}</span>
//                         </div>
//                         </div>
//                     </div>
//                 )
//             })
//         )
//     };
//
//     renderConnectedUsers = () => { // TODO: the status dot only shows the logged in user as active; fix this.
//         return (
//             this.state.connectedUsers.map((user) => {
//                 return (
//                     <div key={user.u_id}>
//                         <img
//
//                             className={'message_img'}
//                             src={"https://cdn.intra.42.fr/users/small_" + user.username  + ".jpg"}
//                         />
//                         <div
//                             className={'connected_' +
//                             ((user.username === getLocal('token').user.username || this.state.activeUsers.includes(user.username)) ? "active" : "inactive")
//                             + '_dot'}>
//                         </div>
//                     </div>
//                     )
//             })
//         )
//     }
//
//     render() {
//         return (
//             <div>
//                 <div className={'message_cont container'}>
//                     <div className={'row ml-0'}>{this.renderConnectedUsers()}</div>
//                     <div className={'row ml-0'}>
//                         <AddToChat tid={this.tid}/>
//                     </div>
//
//                     <div className={"message_feed"}>
//                         {this.renderMessages()}
//                         <div ref={(el) => this.scrollDown = el}> </div>
//                     </div>
//                     <div className={''}>
//                     <textarea id={'chat_input'} onKeyDown={(e) =>this.handleEnter(e)} value={this.state.inputVal}
//                               onChange={(e) => this.setState({inputVal: e.target.value})}>
//                     </textarea>
//                         <button id={'send_button'} onClick={(e) => this.handleClick(e)}>{(this.state.connected ? 'send' : <CircularProgress size={20} />)}</button>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

export default withRouter(Messages)