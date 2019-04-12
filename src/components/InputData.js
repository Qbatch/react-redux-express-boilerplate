import React, { Component } from 'react';
import { insertItem } from '../actions/index'
import { updateItem,editItem } from '../actions/index'
import ListItems from './ListItems'
import store from '../store';
import { defaultStyles, someOtherStyles } from "../styles/Style";
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';
import { Button } from 'semantic-ui-react'
import '../styles/Styles.css'

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


  keyPress = (inputFieldText, e) => {
    var code = e.keyCode || e.which;
    if (code === 13) {
      this.clickHandler(inputFieldText)
    }
  }

  loadTextForUpdate = (updatedText, id,stateId) => {
    this.setState({ text: updatedText, identifier: id, stateId:stateId })
  }

  clickHandler = () => {
    let { text, identifier,stateId } = this.state
    if (text){
      if (identifier !== -1) {
        store.dispatch(updateItem(text, identifier, stateId))
        this.setState({ identifier: -1, text: "" })
      }
      else {
        this.setState({ text: this.inputField.current.value })
        store.dispatch(insertItem(this.state.text))
        this.setState({ text: "" })
      }
    }else{
      new Noty({ 
        text: 'Please, enter a text!',
        type: 'error',
        timeout: 2000,
        progressBar: false,
        theme: 'relax'
       }).show();
    }

  }

  render() {
    const {identifier,nextId} = this.state;
    return (
      <div>
        <div style={{textAlign:'center',width:500,margin:'0 auto'}}>
          <input style={defaultStyles.inputField} type="text" value={this.state.text} onKeyPress={(event) => this.keyPress(this.state.text, event)} onChange={(event) => this.setState({ text: this.inputField.current.value })} ref={this.inputField}></input>
          <Button className='custom-button-submitButton' onClick={this.clickHandler} color='blue'>{identifier === -1 ? "ADD" : "UPDATE"}</Button>
        </div>
        <ListItems loadText={this.loadTextForUpdate} />

      </div>
    )
  }
}
