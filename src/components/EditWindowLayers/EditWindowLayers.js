import React, {Component} from 'react';

//-----< Component Imports -----\\
import LayerWidget from '../LayerWidget/LayerWidget';

class EditWindowLayers extends Component {
  render() {
    return (
      <div id="edit-window-layers">
        <LayerWidget />
        <LayerWidget />
        <LayerWidget />
      </div>
    )
  }
}

export default EditWindowLayers;