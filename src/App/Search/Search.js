import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './search.css'
import {useTrail, animated} from "react-spring";
import Post from "../Feed/Post/Post";

const Search = (props) => {

    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = async(e) => {
        let val = e.target.value;
        let resp = await axios({ // make request to search endpoint, it will return a list of matched users
            method: 'post',
            url: "http://134.209.227.11/api/search/",
            data:
                {
                    search: val
                }
        });
        setResults(resp.data);
        setSearchVal(val);
    };

    useEffect(() => {
        props.setCurrentNav('search') // eslint-disable-next-line
    }, []);

    const config = { mass: 5, tension: 2000, friction: 200 };

    const trail = useTrail(results.length, {
        config,
        opacity: results.length ? 1 : 0,
        x: results.length ? 0 : 20,
        height: results.length ? 80 : 0,
        from: {opacity: 0, x: 50, height: 0},
    });

    const renderResults = (results) => {
        if (results) {
            return (
                trail.map(({ x, height, ...rest }, i) => {
                    return (
                        <animated.div
                            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
                            id={'feed'} key={results[i].id} className={'my-2'}>
                            <img className={'profile_pic'}
                                 src={results[i].profile_pic}
                                 alt={results[i].username} />
                            <Link
                                to={'/search/user/' + results[i].id}
                                className={'ml-2 mt-2'}
                            >
                                {results[i].username}
                            </Link>
                        </animated.div>
                    )
                })
            )
        }
    };

    return (
        <div className={'container'}>
            <input  value={searchVal}
                    onChange={handleChange}
            />
            <div>
                {renderResults(results)}
            </div>
        </div>
    );
};

export default Search;
