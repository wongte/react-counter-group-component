import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { INITIAL_VALUE_OF_COUNTER } from '../constants/constants'
import { Button, Row, Col, Space } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.incrementCounter = this.incrementCounter.bind(this)
    this.decrementCounter = this.decrementCounter.bind(this)

    this.state = {
      counter: INITIAL_VALUE_OF_COUNTER,
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.counter !== this.state.counter) {
      // counter is updated
      this.props.onValueChange(this.state.counter - prevState.counter)
    }
  }

  componentWillUnmount() {
    this.props.onValueChange(-this.state.counter)
  }

  componentDidMount() {
    this.props.onValueChange(this.state.counter)
  }

  incrementCounter() {
    this.setState((prevState) => ({ counter: prevState.counter + 1 }))
  }

  decrementCounter() {
    this.setState((prevState) => ({ counter: prevState.counter - 1 }))
  }

  render() {
    return (
      <Row>
        <Col span={24}>
          <Space>
            <Button
              shape="circle"
              type="primary"
              onClick={this.incrementCounter}
              icon={<PlusOutlined />}
            />
            <span>{this.state.counter}</span>
            <Button
              shape="circle"
              type="primary"
              onClick={this.decrementCounter}
              icon={<MinusOutlined />}
            />
          </Space>
        </Col>
      </Row>
    )
  }
}

Counter.propTypes = {}

export default Counter
