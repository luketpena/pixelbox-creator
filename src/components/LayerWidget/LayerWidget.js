import React, {Component} from 'react';
import {connect} from 'react-redux';

class LayerWidget extends Component {

  selectLayer = ()=> {
    this.props.dispatch({type: 'SET_LAYER_SELECT', payload: this.props.index})
  }

  clickDelete = ()=> {
    let q = window.confirm(`Are you sure you wish to delete this layer?`);
    if (q) {
      this.props.dispatch({type: 'REMOVE_LAYER', payload: this.props.index})
    }
  }

  moveLayer = (index,newPos)=> {
    this.props.dispatch({type: 'MOVE_LAYER', payload: {index,newPos}})
  }

  render() {
    return (
      <div className="layer-widget">
        <div className="layer-widget-select" onClick={this.selectLayer}></div>
        <div className="layer-widget-move-box">
          <button className="layer-widget-content" onClick={()=>this.moveLayer(this.props.index,this.props.index-1)}>^</button>
          <button className="layer-widget-content" onClick={()=>this.moveLayer(this.props.index,this.props.index+1)}>v</button>
        </div>
        <div className="layer-widget-main-box">
          <p className="layer-widget-content">{this.props.layer.layer_name}</p>
        </div>
        <div className="layer-widget-delete-box">
          <button className="layer-widget-content" onClick={this.clickDelete}>X</button>
        </div>
      </div>
    )
  }
}

export default connect()(LayerWidget)