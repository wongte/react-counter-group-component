import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'
import CounterApi from '../apis/CounterApi'
import { INITIAL_NUMBER_OF_COUNTER, KEY_ENTER, INITIAL_VALUE_OF_COUNTER } from '../constants/constants'

export default class CounterGroup extends Component {
  constructor(props) {
    super(props)

    this.onInputNumberCounterChange = this.onInputNumberCounterChange.bind(this)
    this.onCounterValueChanged = this.onCounterValueChanged.bind(this)
    this.onInputNumberCounterKeyPress = this.onInputNumberCounterKeyPress.bind(
      this
    )
    this.state = {
      numberOfCounters: INITIAL_NUMBER_OF_COUNTER,
      valueInInput: INITIAL_NUMBER_OF_COUNTER,
      total: INITIAL_NUMBER_OF_COUNTER * INITIAL_VALUE_OF_COUNTER,
    }
  }

  static propTypes = {}

  componentDidMount() {
    CounterApi.getCounter()
      .then((result) => {
        this.setState({
          numberOfCounters: result.data.size,
          valueInInput: result.data.size,
        })
      })
      .catch((error) => console.log(error.response.data))
  }

  onInputNumberCounterChange(event) {
    this.setState({ valueInInput: event.target.value })
  }

  onInputNumberCounterKeyPress(event) {
    if (event.key === 'Enter') {
      this.onInputNumberCounterEnter()
    }
  }

  onInputNumberCounterEnter() {
      let value = this.state.valueInInput
      let result = 0
      if (value.length > 0 && parseInt(value) > 0) {
        result = parseInt(value)
      }
      CounterApi.updateCounter(result)
        .then((response) => {
          this.setState({ numberOfCounters: result })
        })
        .catch((error) => console.log(error.response.data))
  }

  onCounterValueChanged(delta) {
    this.setState((prevState) => ({ total: prevState.total + delta }))
  }

  render() {
    return (
      <div>
        <span>
          <strong>Total: </strong>
          {this.state.total}
        </span>
        <br></br>
        <label>Number of Counters: </label>
        <input
          value={this.state.valueInInput}
          onChange={this.onInputNumberCounterChange}
          onKeyPress={this.onInputNumberCounterKeyPress}
        />
        {[...Array(this.state.numberOfCounters)].map((_, index) => (
          <Counter key={index} onValueChange={this.onCounterValueChanged} />
        ))}
      </div>
    )
  }
}
