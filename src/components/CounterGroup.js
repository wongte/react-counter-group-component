import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'
import CounterApi from '../apis/CounterApi'

export default class CounterGroup extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onCounterValueChanged = this.onCounterValueChanged.bind(this)
    this.state = {
      numberOfCounters: 0,
      total: 0,
    }
  }

  static propTypes = {}

  componentDidMount() {
    CounterApi.getCounter().then((result) => {
      this.setState({ numberOfCounters: result.data.size })
    })
  }

  onChange(event) {
    let value = event.target.value
    let result = 0
    if (value.length > 0 && parseInt(value) > 0) {
      result = parseInt(value)
    }
    CounterApi.updateCounter(result).then((response) => {
      this.setState({ numberOfCounters: response.data.size })
    })
  }

  onCounterValueChanged(delta) {
    this.setState(prevState => ({ total: prevState.total + delta }))
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
        <input value={this.state.numberOfCounters} onChange={this.onChange} />
        {[...Array(this.state.numberOfCounters)].map((_, index) => (
          <Counter key={index} onValueChange={this.onCounterValueChanged} />
        ))}
      </div>
    )
  }
}
