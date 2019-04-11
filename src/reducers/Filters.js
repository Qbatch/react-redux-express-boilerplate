import { connect } from 'react-redux'

function filterItems(state =[], action) {
  switch (action.type) {
    
    case 'SHOW_DETAILS':
      state = action.filterState;
      let stateCopy = [...state];
      for (let i = 0; i < stateCopy.length; i++) {
        if (action.id === i) {
          const obj = stateCopy[i]
          return obj
        }
      }
    default:
      return state
  }
}


export default filterItems

