import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import './search.css'

const Search = () => {

    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = async(e) => {
        let val = e.target.value;
        let resp = await axios({
            method: 'post',
            url: "http://127.0.0.1:8002/api/search/",
            data:
                {
                    search: val
                }
        });
        setResults(resp.data)
        setSearchVal(val);
    };

    const renderResults = (results) => {
        if (results) {
            return (
                results.map((result) => {
                    return (
                        <div className={'row my-2'} key={result.id}>
                            <img className={'profile_pic'} src={result.profile_pic} alt={result.username} />
                            <Link
                                to={'/search/user/' + result.id}
                                className={'ml-2 mt-2'}
                            >{result.username}</Link>
                        </div>

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
