import filterItems from './Filters'
import manipulateItems from './ItemsManipulation'
import {combineReducers} from 'redux'

const mergedReducers = combineReducers({
  filterItems,
  manipulateItems
})

export default mergedReducers