import React, { useEffect, useState, useRef } from 'react';
//import ReconnectingWebSocket from 'reconnecting-websocket';
import { useParams } from "react-router-dom";
import _ from 'lodash'

import { useNav } from "../Hooks/Hooks";
import Button from "../Components/Buttons/Button";
import { makeRequest } from "../Api/Api";
import './messages.css'
import {calculateTimeSince, getLocal} from "../../utils/utils";

import socketIOClient from "socket.io-client";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputVal: '',
            addUserInputVal: '',
            searchResults: {},
            connectedUsers: []
        };
        this.scrollDown = React.createRef();
    }

    profile = JSON.parse(localStorage.getItem("currentUser"));
    socket;
    tid = this.props.match.params.tid;
    componentDidMount() {
        this.socket = socketIOClient('http://localhost:5010', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        "Authorization": "Bearer " + getLocal('token').token
                    }
                }

            }
        });
        this.getMessages();
        this.connectToRoom();
        this.scrollToBottom();
        this.getUsersConnected();
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.scrollDown.scrollIntoView({ behavior: "smooth"})
    };

    appendMessages = (message) => {
        console.log(this.state.messages);
        this.setState({messages: [...this.state.messages, message]});

    };

    getMessages = async () => {
        let resp = await makeRequest('messages/threads/' + this.tid, 'GET',);
        this.setState({messages: resp.data});
        console.log(this.state.messages);
    };


    connectToRoom = () => {
        console.log(this.state.messages);
        this.socket.on('chat-message', (message) => {
            this.appendMessages(message);
            this.scrollDown.scrollIntoView({ behavior: "smooth"});
        });
    };

    handleClick = async (event) => {
        event.preventDefault();
        if (this.socket) {
            var final_data = {
                'message': this.state.inputVal,
            };
            this.socket.emit('send-message', {
                message: this.state.inputVal,
                username: this.profile.username,
                time_sent: new Date().toISOString(),
                t_id: this.tid});
        }
        this.setState({ inputVal: ''});
    };

    handleEnter = (event) => {
        if (event.key === "Enter") {
            this.handleClick(event);
        }
    };

    handleSearchChange = async(e) => {
        this.setState({

            searchResults: [],
        });
        let val = e.target.value;
        console.log(val);
        if (val.length) {
            let resp = await makeRequest(
                "users/search",
                'post',
                {
                    search: val
                }
            );
            if (resp.data.length)
            {
                this.setState({
                    searchResults: resp.data[0],
                })

            }
        }
        this.setState({
            addUserInputVal: val,
        })
    };

    addUser = async (e) => {
        if (e.key === "Enter") {
            if (this.state.searchResults) {
                let resp = await makeRequest('messages/threads/add_user', 'post',
                    {
                        threadId: this.tid,
                        targetId: this.state.searchResults.u_id
                    });
                if (resp.data)  this.setState({connectedUsers: [...this.state.connectedUsers, resp.data] });
            }
            this.setState({ addUserInputVal: '', searchResults: {}})
        }
    };

    getUsersConnected = async () => {
        let resp = await makeRequest('messages/threads/' + this.tid + '/users');
        if (resp.data) {
            this.setState({ connectedUsers: resp.data })
        }
    };

    renderMessages = () => {
        return (
            this.state.messages.map((message) => {
                return (
                    <div key={message.m_id} className={(message.username === this.profile.username) ? "sent" : "received"}>
                        <div className={'container-fluid'}>
                        <div className={'row message_info'}>
                            <img className={'message_img'} src={"https://cdn.intra.42.fr/users/small_" + message.username + (message.username === 'marvin' ? ".png" : ".jpg")}/>
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
    };
    render() {
        console.log('rendered');
        return (
            <div>
                <div className={'message_cont container'}>
                    <div>{this.state.connectedUsers.map(user => <img key={user.u_id} className={'message_img'} src={"https://cdn.intra.42.fr/users/small_" + user.username  + ".jpg"}/>)}</div>
                    <input onKeyDown={(e) => this.addUser(e)} value={this.state.addUserInputVal} onChange={(e) => this.handleSearchChange(e)} placeholder={'add user'}/>
                    <span className={'ml-2'}>{this.state.searchResults ? this.state.searchResults.username : ''}</span>

                    <div className={"message_feed"}>
                        {this.renderMessages()}
                        <div ref={(el) => this.scrollDown = el}> </div>
                    </div>
                    <div className={''}>
                    <textarea onKeyDown={(e) =>this.handleEnter(e)} value={this.state.inputVal}
                              onChange={(e) => this.setState({inputVal: e.target.value})}>
                    </textarea>
                        <Button onClick={(e) => this.handleClick(e)} text={'SEND'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages