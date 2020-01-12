import React, {Component} from 'react';
import {connect} from 'react-redux';

//-----< Component Imports -----\\
import DetailsFrame from '../DetailsFrame/DetailsFrame';
import DetailsLayer from '../DetailsLayer/DetailsLayer';

class EditWindowDetails extends Component {

  renderDetails = ()=> {
    if (this.props.frame.select===-1) {
      return <DetailsFrame />
    } else {
      return <DetailsLayer key={this.props.frame.select}/>
    }
  }

  render() {
    return (
      <div id="edit-window-details">
        {this.renderDetails()}
      </div>
    )
  }
}

export default connect(state=>({frame: state.edit}))(EditWindowDetails);