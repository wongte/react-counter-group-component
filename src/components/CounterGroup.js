import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'
import { INITIAL_NUMBER_OF_COUNTER } from '../constants/constants'

export default class CounterGroup extends Component {
    constructor(props) {
        super(props)
    
        this.onChange = this.onChange.bind(this)
        this.state = {
             numberOfCounters: INITIAL_NUMBER_OF_COUNTER
        }
    }

    static propTypes = {
    }

    onChange(event) {
        let value = event.target.value
        this.setState(prevState => ({
            numberOfCounters: value.length > 0 ? parseInt(value) : 0
        }))
    }

    render() {
        return (
            <div>
            <input value={this.state.numberOfCounters} onChange={this.onChange}/>
                {
                    [...Array(this.state.numberOfCounters)].map((_, index) => <Counter key={index}/>)
                }
            </div>
        )
    }
}
