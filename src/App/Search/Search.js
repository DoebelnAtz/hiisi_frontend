import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom'
import {useTrail, animated} from "react-spring";

import {makeRequest} from "../Api/Api";
import './search.css'
import {useNav} from "../../Hooks/Hooks";
import CurrentNavContext from "../../Context/CurrentNavContext";

const Search = () => {

    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);
    const {setCurrentNav} = useContext(CurrentNavContext);

    const handleChange = async(e) => {
        setResults([]);
        let val = e.target.value;
        if (val.length) {
            let resp = await makeRequest( // make request to search endpoint, it will return a list of matched users
                "users/search",
                'post',
                {
                    search: val
                }
            );
            setResults(resp.data);
        }
        setSearchVal(val);
    };

    useNav('search', setCurrentNav);

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
                            id={'feed'} key={results[i].u_id} className={'my-2'}>
                            <img className={'profile_pic'}
                                 src={results[i].profile_pic}
                                 alt={results[i].username} />
                            <Link
                                to={'/search/user/' + results[i].u_id}
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
                    placeholder={'username'}
            />
            <div>
                {renderResults(results)}
            </div>
        </div>
    );
};

export default Search;
