import React, { Component } from "react";
import GridItem from "./GridItem";
import source from 'sources/cell';
import Timer from "components/timer/Timer";
import Storage from "lib/storage"
import {
  Row,
  Col,
} from 'react-bootstrap';

export default class MyGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
    };
    this.setData();
    this.connect();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.connect(),
      1000 * 60
    );
  }

  async connect() {
    let webSocket = new WebSocket('ws://164.90.218.141/ws/pixels');
    console.log(webSocket);
    let context = this;
    webSocket.onmessage = function receiveMessage(response) {
      let data = response['data'];
      let json = JSON.parse(data);
      document.getElementsByClassName("GridRow")[json.x].getElementsByClassName("GridItem")[json.y].setAttribute("style", "background-color:" + json.color);
    }
  }

  async setData() {
    const result = await source.get_all();
    this.setState({
      result: result,
    });
  }

  render() {
    if (!this.state.result) {
      return <div>"Loading..."</div>;
    }
    var arr = [];
    const result = this.state.result.pixels;
    for (var k = 0; k < result.length; k++) {
      if (arr[result[k].x] == null) {
        arr[result[k].x] = [];
      }
      arr[result[k].x][result[k].y] = result[k].color;
    }
    const gridItems = [];

    for (let rowIndex = 0; rowIndex < 100; rowIndex++) {
      gridItems[rowIndex] = {item: [], rowIndex: rowIndex};
      for (let columnIndex = 0; columnIndex < 200; columnIndex++) {
        let color = 'rgb(228, 228, 228)';
        if (arr[rowIndex] != null && arr[rowIndex][columnIndex] != null) {
          color = arr[rowIndex][columnIndex];
        }
        gridItems[rowIndex].item.push(
            <GridItem
              key={columnIndex}
              color={color}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              selectedColor={this.props.selectedColor}
            />,
        );
      }
    }
    let time = 0
    if (this.state.result.rollback_time != null) {
      time = this.state.result.rollback_time * 1000;
      Storage.set("timer", time);
    }

    return (
      <div>
        <div>
          <Row>
            <Col md={2} className={"col-md-offset-5"}>
              <Timer time={time}/>
            </Col>
          </Row>
        </div>
        {gridItems.map(rowItem => {
          return <div className="GridRow" key={rowItem.rowIndex}>{rowItem.item}</div>;
        })}
      </div>
    );
  }
}
