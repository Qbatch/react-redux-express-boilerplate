import React, { Component } from 'react';
import { insertItem } from '../actions/index'
import { updateItem,editItem } from '../actions/index'
import ListItems from './ListItems'
import store from '../store';
import { defaultStyles, someOtherStyles } from "../styles/Style";

export class InputData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: -1,
      text: "",
      stateId: -1
    }
    this.inputField = React.createRef();
  }

  loadTextForUpdate = (updatedText, id,stateId) => {
    this.setState({ text: updatedText, identifier: id, stateId:stateId })
  }

  clickHandler = () => {
    let { text, identifier,stateId } = this.state
    if (identifier !== -1) {
      store.dispatch(updateItem(text, identifier, stateId))
      //store.dispatch(editItem(identifier, text))
      this.setState({ identifier: -1, text: "" })
    }
    else {
      this.setState({ text: this.inputField.current.value })
      store.dispatch(insertItem(this.state.text))
      this.setState({ text: "" })
    }
  }

  render() {
    return (
      <div>
        <div style={{textAlign:'center',width:500,margin:'0 auto'}}>
          <input style={defaultStyles.inputField} type="text" value={this.state.text} onChange={(event) => this.setState({ text: this.inputField.current.value })} ref={this.inputField}></input>
          <button style={defaultStyles.submitButton} onClick={this.clickHandler}>Add</button>
        </div>
        <ListItems loadText={this.loadTextForUpdate} />

      </div>
    )
  }
}
