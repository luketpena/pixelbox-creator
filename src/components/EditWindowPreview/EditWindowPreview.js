import React, {Component} from 'react';
import pb from '../../pixelbox';

import {connect} from 'react-redux';

//-----< Component Imports -----\\
import PreviewBar from '../PreviewBar/PreviewBar';




class EditWindowPreview extends Component {

  componentDidMount () {
    this.pixelboxInit();
  }

  pixelboxInit = ()=> {
    console.log('INIT PIXELBOX');
    
    pb.createFrame(
      '#preview-frame',
      this.props.frame.bkg_url,
      this.props.frame.layerData,
      this.props.frame.size,
      this.props.frame.extend,
      this.props.frame.display,
    );
  }

  componentDidUpdate () {
    //pb.recalculateFrame(0,this.props.frame)

  }

  generateKey = ()=> {
    return 10*Math.random();
  }

  render() {
    return (
      <div id="edit-window-preview">
        <PreviewBar />
        
        
        <div id="edit-reducer-info">{JSON.stringify(this.props.frame)}</div>
      </div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(EditWindowPreview);