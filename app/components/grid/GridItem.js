import React from "react";
import "./GridItem.css";

class GridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
    };
  }

  // This is needed to properly render updates from socket.io
  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.setState({color: this.props.color});
    }
  }

  handleClick = () => {
    const color = this.props.selectedColor;
    source.color({x: this.props.columnIndex, y: this.props.rowIndex, color: color});
    this.setState({ color });
    
  };

  render() {
    return (
      <div className="GridItem"
        onClick={this.handleClick}
        style={{ backgroundColor: this.state.color }}
      >
      </div>
    );
  }
}

export default GridItem;
