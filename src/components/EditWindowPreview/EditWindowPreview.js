import React, {Component} from 'react';

import PreviewFrame from '../PreviewFrame/PreviewFrame';

import {connect} from 'react-redux';

//-----< Component Imports -----\\
import PreviewBar from '../PreviewBar/PreviewBar';




class EditWindowPreview extends Component {

  

  generateKey = ()=> {
    return 10*Math.random();
  }

  render() {
    let ratio = [
      this.props.frame.display[0]/this.props.frame.size[0],
      this.props.frame.display[1]/this.props.frame.size[1]
    ]
    let style_extend = {
      width: this.props.frame.display[0]+(this.props.frame.extend[0]*ratio[0])*2,
      height: this.props.frame.display[1]+(this.props.frame.extend[1]*ratio[1]),
    }
    
    return (
      <div id="edit-window-preview">
        <PreviewBar />
        <div id="preview-extend"
          style={style_extend}
          key={this.generateKey()}
        />
        <PreviewFrame key={this.generateKey()}/>
        <div id="edit-reducer-info">{JSON.stringify(this.props.frame.layerData[0].filter)}</div>
      </div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(EditWindowPreview);