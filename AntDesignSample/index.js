import React, { Component } from 'react';
import { DatePicker, message } from "antd";
import { version, Button ,Alert} from "antd";

export class AntDesign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null
    }
    
  }
  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format("YYYY-MM-DD") : "None"}`);
    this.setState({ date });
  };


  render() {
    const { date } = this.state;
    return (
      <div style={{ width: 400, margin: "100px auto" }}>
        <DatePicker onChange={this.handleChange} />
        <h2>{version}</h2>
        <Button>Click me</Button>
        <Button type="danger">Danger</Button>
        <Button type="primary">primary button</Button>
        <div style={{ marginTop: 20 }}>
          Selected Date: {date ? date.format("YYYY-MM-DD") : "None"}
        </div>
        <Alert message={`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`} type="success" />
      </div>
    );
  }
}
