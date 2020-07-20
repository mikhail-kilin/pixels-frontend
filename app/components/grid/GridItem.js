import React from "react";
import source from 'sources/cell';
import Storage from "lib/storage"
import time from 'sources/time';

class GridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      this.setState({color: this.props.color});
    }
  }

  handleClick = async () => {
    if (Storage.get("timer") > 0) return;
    const color = this.props.selectedColor;
    let result = await source.color({x: this.props.rowIndex, y: this.props.columnIndex, color: color});
    //this.setState({ color: color });
    if (result.time_left != null) {
      Storage.set("timer", (await result.time_left * 1000))
    } else {
      Storage.set("timer", (await time.get()).rollback_time * 1000);
    }
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
