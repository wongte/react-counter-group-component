import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'
import { INITIAL_NUMBER_OF_COUNTER } from '../constants/constants'

export default class CounterGroup extends Component {
    constructor(props) {
        super(props)
    
        this.initArray = this.initArray.bind(this)
        this.onChange = this.onChange.bind(this)
        this.state = {
             numberOfCounters: INITIAL_NUMBER_OF_COUNTER
        }
    }
    

    static propTypes = {
        prop: PropTypes
    }

    initArray(size) {
        return Array.from(Array(size).keys())
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
                    this.initArray(this.state.numberOfCounters).map(index => <Counter key={index}/>)
                }
            </div>
        )
    }
}
