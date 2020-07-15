import React, { Component } from "react";
import GridItem from "./GridItem";
import source from 'sources/cell';

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
    for (var i = 0; i < 100; i++) {
      arr[i] = [];
      for (var j = 0; j < 100; j++) {
        arr[i][j] = 'rgb(228, 228, 228)'
      }
    }
    const result = this.state.result;
    for (var k = 0; k < result.length; k++) {
      arr[result[k].x][result[k].y] = result[k].color;
    }
    const gridItems = [];
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
      gridItems[rowIndex] = {item: [], rowIndex: rowIndex};
      for (let columnIndex = 0; columnIndex < arr[rowIndex].length; columnIndex++) {
        gridItems[rowIndex].item.push(
            <GridItem
              key={columnIndex}
              color={arr[rowIndex][columnIndex]}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              selectedColor={this.props.selectedColor}
            />,
        );
      }
    }

    return (
      <div>
        {gridItems.map(rowItem => {
          return <div className="GridRow" key={rowItem.rowIndex}>{rowItem.item}</div>;
        })}
      </div>
    );
  }
}
