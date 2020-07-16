import React, { Component } from "react";
import FooterColorPalette from "./FooterColorPalette";
import MyGrid from "./MyGrid";
import {
  Grid
} from 'react-bootstrap';


class Place extends Component {

  constructor(props) {
    super(props);
    this.onColorSelected = this.onColorSelected.bind(this);
    this.state = {
      selectedColor: 'rgb(255, 255, 255)',
    }
  }

  onColorSelected(color) {
    this.setState({
      selectedColor: color,
    })
  }

  render() {
    return (
      <Grid>
        <div className="Place">
          <MyGrid selectedColor={this.state.selectedColor} />
          <FooterColorPalette
            onColorSelected={this.onColorSelected}
            selectedColor={this.state.selectedColor}
          />
        </div>
      </Grid>
    );
  }
}

export default Place;
