import React, { Component } from "react";
import FooterColorPalette from "./FooterColorPalette";
import Grid from "./Grid";

class Place extends Component {

  constructor(props) {
    super(props);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.state = {
      selectedColor: null,
    }
  }

  onColorSelected(color) {
    this.setState({
      selectedColor: color,
    })
  }

  render() {
    return (
      <div className="Place">
        <div>Color this grid</div>
        <Grid selectedColor={this.state.selectedColor} />
        <FooterColorPalette
          onColorSelected={this.onColorSelected}
          selectedColor={this.state.selectedColor}
        />
      </div>
    );
  }
}

export default Place;
