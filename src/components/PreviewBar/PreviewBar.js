import React, {Component} from 'react';

class PreviewBar extends Component {

  componentDidMount () {
    console.log('Preview bar mount');
    
  }

  render() {
    return (
      <div id="preview-bar">
        <div id="preview-bar-main">
          <input type="text" placeholder="Frame Name"/>
          <button>Save</button>
          <button>Export</button>
        </div>
        <div id="preview-bar-return">
          <button>Return to Control Panel</button>
        </div> 
      </div>
    )
  }
}

export default PreviewBar;