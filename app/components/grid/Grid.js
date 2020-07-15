import React, { Component } from "react";
import GridItem from "./GridItem";
import source from 'sources/cell';
import "./Grid.css";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    const result = source.get_all();

    var arr = [];
    for (var i = 0; i < 1000; i++) {
      arr[i] = [];
      for (var j = 0; j < 1000; j++) {
        arr[i][j] = "#FFFFFF"
      }
    }
    for(let i = 0; i < result.length; i++) {
        arr[result[i].x, result[i].y] = result.color;
    }

    this.state = {
      drawing: arr,
    };
  }

  render() {
    if (!this.state.drawing) {
      return <div>"Loading..."</div>;
    }
    const gridItems = [];
    for (let rowIndex = 0; rowIndex < this.state.drawing.length; rowIndex++) {
      gridItems[rowIndex] = [];
      for (let columnIndex = 0; columnIndex < this.state.drawing[rowIndex].length; columnIndex++) {
        gridItems[rowIndex].push(
          <GridItem
            color={this.state.drawing[rowIndex][columnIndex]}
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
          return <div className="GridRow">{rowItem}</div>;
        })}
      </div>
    );
  }
}
