import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getInitialState,markItem, deleteItem, showDetail } from '../actions/index'
import store from '../store';


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
  }

  componentWillMount(){
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
      if (this.state.identifier ===-1){
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
          <div key={index}>
            {item.text}
          </div>
        );

        return listItems2
      }
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 30, marginLeft:635,marginTop: 50 }}>
          <button onClick={(event) => this.showAllItems(event)}>View All</button>
          <button onClick={(event) => this.showAllCompleteItems(event)}>View Completed items</button>                                         
        </div>
        {this.ViewResults()}
        <h2>{this.state.detailIdentifier !== -1 && "ID:      " + this.props.filterItems.id + "    Value:     " + this.props.filterItems.text + "    completed:     " + this.props.filterItems.completed}</h2>
        {this.state.detailIdentifier !== -1 && <button onClick={(event)=>this.clearDetails(event)}>Clear details</button>}
      </div>
    )
  }
}

export default connect(mapStateToProps,null)(ListItems)