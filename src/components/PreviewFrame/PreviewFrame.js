import React, {Component} from 'react';
import {connect} from 'react-redux';
import pb from '../../pixelbox';

class PreviewFrame extends Component {

  componentDidMount () {
    pb.setGlobals(this.props.frame.smoothing,this.props.frame.framerate,this.props.frame.pixelsnap);
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

  

  render() {
    return (
      <div id="preview-frame"></div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(PreviewFrame);