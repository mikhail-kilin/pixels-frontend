import React, { Component } from "react";
import Storage from "lib/storage"

class Timer extends Component {

  constructor(props) {
    super(props);
    let time = new Date();
    time.setTime(props.time);
    time.setHours(0);
    this.state = {
        time: time,
        seconds: props.time
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    if (this.state.seconds > 0) {
      this.setState({
        time: new Date(this.state.time - 1000),
        seconds: this.state.seconds - 1000
      });
      Storage.set("timer", this.state.seconds);
    } else {
      let time = this.state.time;
      let seconds = this.state.seconds;
      if (Storage.get("timer") > 0) {
        seconds = Number(Storage.get("timer"));
        time = new Date();
        time.setTime(seconds);
        time.setHours(0);
      }
      this.setState({
        time: time,
        seconds: seconds
      });
    }
  }

  render() {
    let time = this.state.time.toLocaleTimeString().split(":")
  return (<h2>{time[1] + ":" + time[2]}</h2>);
  }
}

export default Timer;
