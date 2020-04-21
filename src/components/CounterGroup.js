import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'
import { INITIAL_NUMBER_OF_COUNTER } from '../constants/constants'

export default class CounterGroup extends Component {
    constructor(props) {
        super(props)
    
        this.onChange = this.onChange.bind(this)
        this.onCounterValueChanged = this.onCounterValueChanged.bind(this)
        this.state = {
             numberOfCounters: 0,
             total: 0
        }
    }

    static propTypes = {
    }

    onChange(event) {
        let value = event.target.value
        let result = 0
        if (value.length > 0 && parseInt(value) > 0) {
            result = parseInt(value)
        }
        this.setState(prevState => ({
            numberOfCounters: result,
            total: result * INITIAL_NUMBER_OF_COUNTER
        }))
    }

    onCounterValueChanged(delta) {
        this.setState(prevState => ({
            total: prevState.total + delta
        }))
    }

    render() {
        return (
            <div>
            <span><strong>Total: </strong>{this.state.total}</span><br></br>
            <label>Number of Counters: </label><input value={this.state.numberOfCounters} onChange={this.onChange}/>
                {
                    [...Array(this.state.numberOfCounters)]
                        .map((_, index) => <Counter key={index} onValueChange={this.onCounterValueChanged}/>)
                }
            </div>
        )
    }
}
