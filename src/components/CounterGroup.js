import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'
import CounterApi from '../apis/CounterApi'
import { INITIAL_NUMBER_OF_COUNTER, KEY_ENTER, INITIAL_VALUE_OF_COUNTER } from '../constants/constants'
import { Input, Row, Col, Statistic, Card, Space, Alert } from 'antd'

const { Search } = Input

export default class CounterGroup extends Component {
  constructor(props) {
    super(props)

    this.onInputNumberCounterChange = this.onInputNumberCounterChange.bind(this)
    this.onCounterValueChanged = this.onCounterValueChanged.bind(this)
    this.onInputNumberCounterKeyPress = this.onInputNumberCounterKeyPress.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
    this.state = {
      numberOfCounters: INITIAL_NUMBER_OF_COUNTER,
      valueInInput: INITIAL_NUMBER_OF_COUNTER,
      total: INITIAL_NUMBER_OF_COUNTER * INITIAL_VALUE_OF_COUNTER,
      isLoading: false,
      showSuccess: false,
    }
  }

  static propTypes = {}

  componentDidMount() {
    this.setState({ isLoading: true })
    CounterApi.getCounter()
      .then((result) => {
        this.setState({
          numberOfCounters: result.data.size,
          valueInInput: result.data.size,
          isLoading: false
        })
      })
      .catch((error) => console.log(error.response.data))
  }

  onInputNumberCounterChange(event) {
    this.setState({ valueInInput: event.target.value })
  }

  onInputNumberCounterKeyPress(event) {
    if (event.key === KEY_ENTER) {
      this.onInputNumberCounterEnter()
    }
  }

  onInputNumberCounterEnter() {
      let value = this.state.valueInInput
      let result = 0
      if (value.length > 0 && parseInt(value) > 0) {
        result = parseInt(value)
      }
      this.setState({ isLoading: true })
      CounterApi.updateCounter(result)
        .then((response) => {
          this.setState({ numberOfCounters: result, isLoading: false, showSuccess: true })
        })
        .catch((error) => console.log(error.response.data))
  }

  onCounterValueChanged(delta) {
    this.setState((prevState) => ({ total: prevState.total + delta }))
  }

  closeAlert() {
    this.setState({ showSuccess: false })
  }

  render() {
    return (
      <div>
        { this.state.showSuccess ? (
        <Alert
          message="Success"
          description="Number of counter is updated"
          type="success"
          showIcon
          closable
          onClose={this.closeAlert}
        />
        ) : null }
        <Row justify="center" gutter={[0, 12]}>
          <Col span={16}>
            <Space>
              <Card>
                <Statistic title="Total Sum" value={this.state.total} />
              </Card>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Search
              addonBefore="Number of Counter:"
              loading={this.state.isLoading}
              value={this.state.valueInInput}
              onChange={this.onInputNumberCounterChange}
              onKeyPress={this.onInputNumberCounterKeyPress}
            />
          </Col>
        </Row>
        {[...Array(this.state.numberOfCounters)].map((_, index) => (
          <Counter key={index} onValueChange={this.onCounterValueChanged} />
        ))}
      </div>
    )
  }
}
