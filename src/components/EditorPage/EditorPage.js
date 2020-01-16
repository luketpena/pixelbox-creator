import React, {Component} from 'react';

//-----< Component Imports >-----\\
import EditWindowLayers from '../EditWindowLayers/EditWindowLayers';
import EditWindowDetails from '../EditWindowDetails/EditWindowDetails'
import EditWindowPreview from '../EditWindowPreview/EditWindowPreview';

class EditorPage extends Component {

  state = {
    select: -1
  }

  render() {
    return (
      <div id="edit-page">

        <EditWindowPreview />
        <EditWindowLayers />
        <EditWindowDetails select={this.state.select}/>
      </div>
    )
  }
}

export default EditorPage;