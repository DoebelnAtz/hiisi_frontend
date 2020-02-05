import {useContext, useEffect, useState} from "react";
import {makeRequest} from "../App/Api/Api";
import CurrentNavContext from "../Context/CurrentNavContext";
import ErrorContext from '../Context/ErrorContext'
import socketIOClient from "socket.io-client";

export const useNav = (current) => {
    const {setCurrentNav} = useContext(CurrentNavContext);
    useEffect(() => {
        setCurrentNav(current);
    }, [current]);
};

export const useSocket = (url, options, room) => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    let socket;

    useEffect(() => {
        socket = socketIOClient(url, options);
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
            setMessages({...messages, message});
        });
        return () => {
            socket.disconnect();
        };
    }, [url, room]);

    return {socket, connected, messages, setMessages, activeUsers}
};

export const useDismiss = (refInside, close) => {

    const handleEsc = (e) => {
        if (e.keyCode !== 27)
            return;
        else
            close();
    };

    const handleClick = (e) => {

        if (refInside.current?.contains(e.target))
            return;
        else
            close();
    };
    useEffect(() => {
        document.addEventListener("keydown", handleEsc, false);
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])
};

export const useRequest = (url, method, body={}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {error, setError} = useContext(ErrorContext);

    let resp;
    useEffect(() => {
        async function request () {
            try {
                setIsLoading(true);
                resp = await makeRequest(url, method, body);
                setData(resp.data);
            } catch (e) {
                setError(JSON.stringify(e.response.status));

            } finally {
                setIsLoading(false)
            }
        }
        request();
    }, []);
    return [data, setData, isLoading]
};