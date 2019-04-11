import axios from 'axios'

/*const instance = axios.create({
  baseURL: 'http://localhost:8000/'
});
need to implement this
*/

axios.defaults.baseURL = 'http://localhost:8000/'
function manipulateItems(state = [], action) {
  switch (action.type) {

    case 'GET_INITIAL_STATE':
    return [...state,...action.payload]
    
    case 'VIEW_COMPLETED_ITEMS':
      let stateCopy2 = []
      for (let i = 0; i < state.length; i++) {
        if (state[i].completed === true) {
          stateCopy2.push(state[i])
        }
      }

    case 'FETCH_NEW_DATA':
      state = action.payload
      return state
      
    case 'VIEW_ALL':
      return state

    case 'MARK_ITEM':
      const stateCopy1 = [...state];
      stateCopy1[action.stateId].completed = action.markedItem.completed
      return stateCopy1

    case 'EDIT_ITEM':
  
      const stateCopy = [...state];
      stateCopy[action.stateId].text = action.payload.text;
      return stateCopy;

    case 'DELETE_ITEM':
      let copystate = [...state];
      copystate.splice(action.id, 1)
      return copystate
    default:
      return state
  }
}


export default manipulateItems
