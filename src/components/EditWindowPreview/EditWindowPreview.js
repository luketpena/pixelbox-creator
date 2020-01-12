import React, {Component} from 'react';
import $ from 'jquery';
import pb from '../../pixelbox';

import {connect} from 'react-redux';

//-----< Component Imports -----\\
import PreviewBar from '../PreviewBar/PreviewBar';




class EditWindowPreview extends Component {

  componentDidMount () {
    this.pixelboxInit();
  }

  pixelboxInit = ()=> {
    const frame1 = pb.createFrame('#preview-frame','https://i.ibb.co/BB16CGL/layer1.png',
      [ //Image URLs
        'https://i.ibb.co/wWHn1gj/layer2.png',
        'https://i.ibb.co/j61b2c3/layer3.png',
        'https://i.ibb.co/f8R94JB/layer4.png',
        'http://www.transparentpng.com/thumb/fog/heroes-and-icons-fog-png-35.png',
        'https://i.ibb.co/y4dmZt2/layer5.png'
      ],
      [.1,.3,.6,.8,1], //Layer strengths
      [256,128], //Base width and height
      [32,8], //Overlap width and height
      [512,256], //Display width and height
      true
    );
  }

  render() {
    return (
      <div id="edit-window-preview">
        <PreviewBar />
        {JSON.stringify(this.props.frame)}
        <div id="preview-frame"></div>
      </div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(EditWindowPreview);