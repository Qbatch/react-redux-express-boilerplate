import store from "../store";
import axios from 'axios'
import { markItemInApi,updateItemFromApi,postData, getInitialStateFromApi, deleteItemFromApi } from './api-methods'
import { mongo } from "mongoose";

export function showDetail(index) {
  let currentState;
  currentState = store.getState().manipulateItems

  return { type: 'SHOW_DETAILS', id: index, filterState: currentState };
}



export const updateItem = (text,id,stateId) => {
  return (dispatch) => {
    updateItemFromApi(text,id).then(data => {
      dispatch({ type: "EDIT_ITEM", stateId: stateId, payload: data })
    });
  }
}


export const insertItem = (text) => {
  return (dispatch) => {
    postData(text).then(data => {
      dispatch({ type: "FETCH_NEW_DATA", payload: data })
    });
  }
}


export const getInitialState = () => {
  return (dispatch) => {
    getInitialStateFromApi().then(data =>{
      dispatch({type:"GET_INITIAL_STATE",payload:data});
    })
  }
}


export const markItem = (stateId,mongoId,text,flag) => {
  return (dispatch) => {
    markItemInApi(stateId, mongoId,flag).then(data => {
      dispatch({ type: "MARK_ITEM", stateId: stateId,markedItem: data})
    })
  }

}

export const deleteItem = (index,stateId) => {
  return (dispatch) => {
    deleteItemFromApi(index).then(data => {
      dispatch({ type: "DELETE_ITEM", id: stateId });
    })
  }
}

//Currying
/*export const someFunction = text => dispatch => {
  getPostedData(text).then(data => {
    dispatch({ type: "FETCH_DATA", payload: data })
  });
}*/

/*export function markItem(index, text, flag) {
  return { type: 'MARK_ITEM', id: index, text: text, completed: flag };
}*/


export function viewAllItems(list) {
  return { type: "VIEW_ALL", recievedResult: list }
}

export function viewCompletedItems() {
  return { type: 'VIEW_COMPLETED_ITEMS' }
}


export function editItem(id, text, completed) {
  return { type: 'EDIT_ITEM', id, text }
}

