import { h, Component, render } from "preact";
import Camera from "../Camera.jsx";

export default class App extends Component {
  state = {
    cameraOn: false,
    type: null,
    hardValidation: { front: null, side: null },
    frontImage: null,
    sideImage: null,
  };

  saveFrontFile = (file) => {
    const data = {message: 'Front', file : file};
    window.top.postMessage(data, '*');
    this.setState({
      type: null,
      frontImage: file,
    });
  };

  saveSideFile = (file) => {
    const data = {message: 'Side', file : file};
    window.top.postMessage(data, '*');
    this.setState({
      type: null,
      sideImage: file,
    });
  };

  disableTableFlow = () => {
    console.log("disableTableFlow");
  };

  turnOffCamera = () => {
    console.log("turnOffCamera");
  };

  setDeviceCoordinates = (coords) => {
    console.log("setDeviceCoordinates", coords);
  };

  toggleCamera = (type) => () => {
    console.log('in toggleCamera is ::');
    this.setState({ type });
  };

  msgHandler = (e) => {
    console.log('data is ::',e.data.message)
    if(e.data.message == "Front") {
      const type = 'front';
      this.setState({ type });
    } else if(e.data.message == "Side") {
      const type = 'side';
      this.setState({ type });
    }
  };

  render() {
    const {
      type,
      hardValidation,
      frontImage,
      sideImage,
    } = this.state;
    window.addEventListener('message', this.msgHandler);
    return (
        <div>
          <button type="button" id="front-image-btn" onClick={this.toggleCamera("front")}>
            Take front image
          </button>
          <button type="button" onClick={this.toggleCamera("side")}>
            Take side image
          </button>
          {type && (
              <Camera
                  type={type}
                  saveFront={this.saveFrontFile}
                  saveSide={this.saveSideFile}
                  isTableFlow={false}
                  hardValidation={hardValidation}
                  disableTableFlow={this.disableTableFlow}
                  turnOffCamera={this.turnOffCamera}
                  setDeviceCoordinates={this.setDeviceCoordinates}
              />
          )}
        </div>
    );
  }
}

render(<App />, document.body);
