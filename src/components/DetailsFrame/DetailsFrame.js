import React, {Component} from 'react';
import {connect} from 'react-redux';
import SizeInputRow from './SizeInputRow';

//-----< Component Imports >-----\\
import DetailsFrameSize from './DetailsFrameSize';
import DetailsFrameMain from './DetailsFrameMain';

class DetailsFrame extends Component {

  render() {
    return (
      <div id="details-frame" className="details-widget">
        
        <DetailsFrameSize />
        <DetailsFrameMain />
        
      </div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(DetailsFrame);