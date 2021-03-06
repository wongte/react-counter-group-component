import axios from 'axios'

const COUNTER_API_URL = 'https://5e9ed3a0fb467500166c47b3.mockapi.io/counters'

class CounterApi {
  static getCounter() {
    return axios.get(COUNTER_API_URL)
  }
  static updateCounter(size) {
    let id = 1
    return axios.put(COUNTER_API_URL + '/' + id, { size })
  }
}

export default CounterApi