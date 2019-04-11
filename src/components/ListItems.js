import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getInitialState,markItem, deleteItem, showDetail } from '../actions/index'
import store from '../store';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import 'noty/lib/themes/relax.css';
import 'noty/lib/themes/metroui.css';


const mapStateToProps = (state) => {
  let { manipulateItems,filterItems} = state
  return { manipulateItems, filterItems }
}



class ListItems extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.checkBox = React.createRef();
    this.state = {
      identifier: -1,
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
  }

  removeItem = (id) => {
    store.dispatch(deleteItem(this.props.manipulateItems[id]._id,id))
  }

  checkItems = (e,id,text) => {
    store.dispatch(markItem(id, this.props.manipulateItems[id]._id, text, e.currentTarget.checked)) 
    this.setState({identifier:-1})
  }


  showAllCompleteItems = (e) => {
    this.setState({identifier:1})
  }

  showAllItems = () =>{
    this.setState({identifier:-1})
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
          <div style={{marginLeft:'auto',marginRight:'auto',width:600,border: '1px solid', padding: 13 }} key={index}>
            <input style={{ display: 'left' }} ref={this.checkBox} checked={item.completed} onChange={(event) => { this.checkItems(event, index, item.text) }} type="checkbox"></input>
            {item.text}
            <div style={{ float: 'right' }}>
              <button onClick={(event) => this.viewDetails(event, index)}>Show Details</button>
              <button onClick={(event) => this.updateItem(index)}>Edit</button>
              <button onClick={(event) => this.removeItem(index)}>Delete</button>
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
      return (<p style={{ textAlign: 'center' }}><b>No data to show</b></p>);
    }
  
    return (
      
      <div>
        {
          this.props.manipulateItems && this.props.manipulateItems.length > 0 && 
          <div>
            <div style={{ marginBottom: 30, marginLeft: 635, marginTop: 50 }}>
              <button onClick={(event) => this.showAllItems(event)}>View All</button>
              <button onClick={(event) => this.showAllCompleteItems(event)}>View Completed items</button>
            </div>
            {this.ViewResults()}
            <h2 style={{ marginTop: 50, textAlign: 'center' }}>{this.state.detailIdentifier !== -1 && this.props.filterItems.text}
            {this.state.detailIdentifier !== -1 && <button style={{marginLeft:30}} onClick={(event) => this.clearDetails(event)}>Clear details</button>}</h2>
          </div>
        }
      </div>
    )
  }
}


export default connect(mapStateToProps,null)(ListItems)