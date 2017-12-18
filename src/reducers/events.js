import { FETCH_EVENTS } from '../actions'
import _ from 'lodash'

export default function (state = {}, action) {
  switch(action.type) {
    case FETCH_EVENTS:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}
