import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
    constructor(props) {
        super(props)
        this.incrementCounter = this.incrementCounter.bind(this)

        this.state = {
            counter: 1
        }
    }

    incrementCounter() {
        this.setState(prevState => ({ counter: prevState.counter + 1}))
    }

    render() {
        return (
        <div>
            <button onClick={this.incrementCounter}>+</button>
            <div>{this.state.counter}</div>
            <button>-</button>
        </div>
        );
    }
}

Counter.propTypes = {

};

export default Counter;