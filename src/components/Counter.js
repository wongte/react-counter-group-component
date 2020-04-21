import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { INITIAL_NUMBER_OF_COUNTER } from '../constants/constants'

class Counter extends Component {
    constructor(props) {
        super(props)
        this.incrementCounter = this.incrementCounter.bind(this)
        this.decrementCounter = this.decrementCounter.bind(this)

        this.state = {
            counter: INITIAL_NUMBER_OF_COUNTER
        }
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.counter !== this.state.counter) {
            // counter is updated
            this.props.onValueChange(this.state.counter - prevState.counter)
        }
    }

    incrementCounter() {
        this.setState(prevState => ({ counter: prevState.counter + 1}))
    }
    
    decrementCounter() {
        this.setState(prevState => ({ counter: prevState.counter - 1}))
    }

    render() {
        return (
        <div>
            <button onClick={this.incrementCounter}>+</button>
            <span>{this.state.counter}</span>
            <button onClick={this.decrementCounter}>-</button>
        </div>
        )
    }
}

Counter.propTypes = {

}

export default Counter