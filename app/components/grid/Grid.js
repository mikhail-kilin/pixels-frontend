import React, { Component } from "react";
import GridItem from "./GridItem";
import source from 'sources/cell';
import Timer from "components/timer/Timer";

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
    };
    this.setData();
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
    const result = this.state.result;
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
    if (result.time_left != null) {
      time = result.time_left * 1000;
    }

    return (
      <div>
        <div><Timer time={time}/></div>
        {gridItems.map(rowItem => {
          return <div className="GridRow" key={rowItem.rowIndex}>{rowItem.item}</div>;
        })}
      </div>
    );
  }
}
