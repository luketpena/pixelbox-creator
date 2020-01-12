import React, {Component} from 'react';

class PreviewFrame extends Component {
  render() {
    return (
      <div id="preview-frame" key={this.generateKey}></div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(PreviewFrame);