import React, {Component} from 'react';


//-----< Component Imports >-----\\
import EditWindowLayers from '../EditWindowLayers/EditWindowLayers';
import EditWindowDetails from '../EditWindowDetails/EditWindowDetails'
import EditWindowPreview from '../EditWindowPreview/EditWindowPreview';

class EditorPage extends Component {
  render() {
    return (
      <div id="edit-page">
        <EditWindowPreview />
        <EditWindowLayers />
        <EditWindowDetails />
      </div>
    )
  }
}

export default EditorPage;