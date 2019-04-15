import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getInitialState,markItem, deleteItem, showDetail } from '../actions/index'
import store from '../store';
import { defaultStyles, someOtherStyles } from "../styles/Style";
import { Button,Checkbox,Switch } from 'antd'


const mapStateToProps = (state) => {
  let { manipulateItems,filterItems} = state
  return { manipulateItems, filterItems }
}



class ListItems extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
  
    this.state = {
      identifier: -1,
      viewAllItems:false,
      idToBeUpdated: -1,
      detailIdentifier:-1
    }

    store.dispatch(getInitialState())
  }


  updateItem = (index) => {
    for (let i = 0; i < this.props.manipulateItems.length; i++){
      if (index === i){
        this.props.loadText(this.props.manipulateItems[index].text, this.props.manipulateItems[index]._id,index)
      }
    }
    this.setState({idToBeUpdated:index});

  }

  removeItem = (id) => {
    store.dispatch(deleteItem(this.props.manipulateItems[id]._id,id))
  }

  checkItems = (e,id,text) => {
    store.dispatch(markItem(id, this.props.manipulateItems[id]._id, text, e.target.checked)) 
    this.setState({identifier:-1})
  }


  showAllCompleteItems = (event) => {
    if (!this.state.viewAllItems){
      this.setState({ identifier: 1, viewAllItems: true }) 
    }else{
      this.setState({ identifier: -1, viewAllItems: false }) 
    }
  }

  viewDetails = (event,index) => {
    store.dispatch(showDetail(index));
    this.setState({ detailIdentifier:1})
  }

  clearDetails = () => {
    this.setState({
      detailIdentifier:-1
    })
  }

  ViewResults = () => {

    if (this.state.identifier === -1){
        const listItems = this.props.manipulateItems.map((item, index) =>
          <div style={{marginLeft:'auto',marginRight:'auto',width:600,border: '1px solid', height:50 }} key={index}>
            <Checkbox style={{ marginLeft: '10px', marginRight: '10px', marginTop: '16px', display: 'left' }} checked={item.completed} onChange={(event) => { this.checkItems(event, index, item.text) }}/>
            <b>{item.text}</b>
            <div style={{ paddingTop:7,float: 'right' }}>
              <Button style={defaultStyles.detailsButton} onClick={(event) => this.viewDetails(event, index)}>Details</Button>
              <Button style={defaultStyles.editButton} onClick={(event) => this.updateItem(index)}>Update</Button>
              <Button style={defaultStyles.deleteButton} onClick={(event) => this.removeItem(index)}>Delete</Button>
            </div>
          </div>
        );
        return listItems

      }else if (this.state.identifier===1){
        const listItems = []
        for (let i = 0; i < this.props.manipulateItems.length; i++) {
          if (this.props.manipulateItems[i].completed === true) {
            listItems.push(this.props.manipulateItems[i])
          }
        }

        const listItems2 = listItems.map((item, index) =>
          <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 600, border: '1px solid', padding: 13 }} key={index}>
            {item.text}
          </div>
        );
        if (listItems.length <= 0) {
          return (<p style={{ textAlign: 'center' }}><b>No completed item to display!</b></p>);
        }
        return listItems2
      }
  }

  render() {
    if (this.props.manipulateItems.length <= 0) {
      return (<h3 style={{ marginTop:30,textAlign: 'center' }}><b>No data to show</b></h3>);
    }
  
    return (
      
      <div>
        {
          this.props.manipulateItems && this.props.manipulateItems.length > 0 && 
          <div>
            <div style={{ marginBottom: 30, marginLeft: 660, marginTop: 50 }}>
              <h5><Switch onChange={this.showAllCompleteItems} checked={this.state.viewAllItems} />         View all complete items</h5>
              
            </div>
            {this.ViewResults()}
            <h2 style={{ marginTop: 50, textAlign: 'center' }}>{this.state.detailIdentifier !== -1 && this.props.filterItems.text}
              {this.state.detailIdentifier !== -1 && <Button className='custom-button-clearDetailsButton' onClick={(event) => this.clearDetails(event)}>Clear details</Button>}</h2>
          </div>
        }
      </div>
    )
  }
}


export default connect(mapStateToProps,null)(ListItems)