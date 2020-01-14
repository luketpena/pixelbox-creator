import React, {Component} from 'react';
import {connect} from 'react-redux';

//-----< Component Imports -----\\
import LayerWidget from '../LayerWidget/LayerWidget';

class EditWindowLayers extends Component {

  renderLayerWidgets = ()=> {    
    return this.props.layers.map( (layer,i)=> {
      return <LayerWidget key={i} index={i}/>
    })
  }

  addLayer = ()=> {
    this.props.dispatch({type: 'ADD_NEW_LAYER'})
  }

  render() {
    return (
      <div id="edit-window-layers">
        {this.renderLayerWidgets()}
        <div>
          <button onClick={this.addLayer}>Add Layer</button>
        </div>
      </div>
    )
  }
}

export default connect(state=>({layers: state.edit.layerData}))(EditWindowLayers);