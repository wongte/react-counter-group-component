import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'

export default class CounterGroup extends Component {
    constructor(props) {
        super(props)
    
        this.initArray = this.initArray.bind(this)
        this.state = {
             numberOfCounters: 2
        }
    }
    

    static propTypes = {
        prop: PropTypes
    }

    initArray(size) {
        return Array.from(Array(size).keys())
    }

    render() {
        return (
            <div>
                {
                    this.initArray(this.state.numberOfCounters).map(index => <Counter key={index}/>)
                }
            </div>
        )
    }
}
