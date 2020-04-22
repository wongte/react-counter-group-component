import axios from 'axios'
class CounterApi {
  static getCounter() {
    return axios.get('https://5e9ed3a0fb467500166c47b3.mockapi.io/counters')
  }
}

export default CounterApi