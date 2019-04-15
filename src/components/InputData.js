import React, { Component } from 'react';
import { insertItem } from '../actions/index'
import { updateItem,editItem } from '../actions/index'
import ListItems from './ListItems'
import store from '../store';
import { defaultStyles, someOtherStyles } from "../styles/Style";
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';
import '../styles/Styles.css'
import { Button, Input, notification} from 'antd'

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'React redux express boilerplate',
    description: 'This is a simple ToDo app with following technologies used ReactJS, Ant design, Redux, Redux thunk, Axios, Webpack, node.js and mongoDB',
  });
};

notification.config({
  duration: 10,
});

export class InputData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: -1,
      text: "",
      stateId: -1
    }
  }

  componentWillMount(){
    openNotificationWithIcon('success')
  }


  keyPress = (inputFieldText, event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.clickHandler(event)
    }
  }

  loadTextForUpdate = (updatedText, id,stateId) => {
    this.setState({ text: updatedText, identifier: id, stateId:stateId })
  }

  clickHandler = (event) => {
    let { text, identifier,stateId } = this.state
    if (text){
      if (identifier !== -1) {
        store.dispatch(updateItem(text, identifier, stateId))
        this.setState({ identifier: -1, text: "" })
      }
      else {
        this.setState({ text: event.target.value })
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
    const {identifier,text} = this.state;
    return (
      <div>
        <div style={{textAlign:'center',width:500,margin:'0 auto'}}>
          <Input style={defaultStyles.inputField} value={text} type="text" onPressEnter={(event) => this.keyPress(text, event)} onChange={(event) => this.setState({ text: event.target.value })} placeholder="Enter some text!" />
          <Button className='custom-button-submitButton' onClick={this.clickHandler} >{identifier === -1 ? "ADD" : "UPDATE"}</Button>
        </div>
        <ListItems loadText={this.loadTextForUpdate} />

      </div>
    )
  }
}
