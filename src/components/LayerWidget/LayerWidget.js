import React, {Component} from 'react';
import {connect} from 'react-redux';

class LayerWidget extends Component {

  selectLayer = ()=> {
    this.props.dispatch({type: 'SET_LAYER_SELECT', payload: this.props.index})
  }

  render() {
    return (
      <div className="layer-widget">
        <div className="layer-widget-select" onClick={this.selectLayer}></div>
        <div className="layer-widget-move-box">
          <button className="layer-widget-content">^</button>
          <button className="layer-widget-content">v</button>
        </div>
        <div className="layer-widget-main-box">
          <p className="layer-widget-content">{this.props.layer.layer_name}</p>
        </div>
        <div className="layer-widget-delete-box">
          <button className="layer-widget-content">X</button>
        </div>
      </div>
    )
  }
}

export default connect()(LayerWidget)