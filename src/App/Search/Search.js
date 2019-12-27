import React, {Component} from 'react';
import {connect} from 'react-redux';
import  { currentNav } from '../../actions'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './search.css'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {search_val: '', results: []}
    }

    handleChange = async(e) => {
        let val = e.target.value;
        let resp = await axios({
            method: 'post',
            url: "http://127.0.0.1:8002/api/search/",
            data:
                {
                    search: val
                }
        });
        this.setState(
            {
                search_val: val,
                results: resp.data
            }
        );
        console.log(this.state.results)
    };

    renderResults(results) {
        console.log(this.state);
        if (results) {
            return (
                results.map((result) => {
                    return (
                        <div className={'row my-2'} key={result.id}>
                            <img className={'profile_pic'} src={result.profile_pic}/>
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

    componentDidMount() {
        this.props.currentNav('search');
    }

    render() {
        return (
            <div className={'container'}>
                <input  value={this.state.search_val}
                        onChange={this.handleChange}
                />
                <div>
                    {this.renderResults(this.state.results)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps, { currentNav }
)(Search);
