import React, {Component} from 'react';

class LayerWidget extends Component {
  render() {
    return (
      <div className="layer-widget">
        <div className="layer-widget-move-box">
          <button>^</button>
          <button>v</button>
        </div>
        <div className="layer-widget-main-box">
          <p>Layer Name</p>
          <button>Edit</button>
        </div>
        <div className="layer-widget-delete-box">
          <button>X</button>
        </div>

      </div>
    )
  }
}

export default LayerWidget