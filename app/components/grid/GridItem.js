import React from "react";
import source from 'sources/cell';

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
    source.color({x: this.props.rowIndex, y: this.props.columnIndex, color: color, id: Math.floor(Math.random() * Math.floor(10000))});
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
